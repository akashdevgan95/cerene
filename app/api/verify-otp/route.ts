// app/api/verify-otp/route.ts
import { createClient } from "@supabase/supabase-js";
import { render } from "@react-email/render";
import { Resend } from "resend";

//email template
import { WaitlistConfirmationEmail } from "@/emailTemplates/waitlist-confirmation-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { email, otp } = body;

  if (!email || !otp) {
    return new Response(
      JSON.stringify({ error: "Email and OTP are required" }),
      {
        status: 400,
      }
    );
  }

  // Fetch OTP record
  const { data, error } = await supabase
    .from("email_otp_verification")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ error: "Invalid or expired OTP" }), {
      status: 401,
    });
  }

  const isValid = data.otp === otp && new Date(data.expires_at) > new Date();

  if (!isValid) {
    return new Response(JSON.stringify({ error: "Invalid or expired OTP" }), {
      status: 401,
    });
  }

  // Add to waitlist with status: 'subscribed'
  const { error: insertError } = await supabase
    .from("waitlist")
    .upsert({ email, status: "subscribed" }); // upsert prevents duplicate rows

  console.log("insertError", insertError);

  if (insertError) {
    return new Response(
      JSON.stringify({ error: "Failed to add to waitlist" }),
      {
        status: 500,
      }
    );
  }

  // Remove OTP after use
  await supabase.from("email_otp_verification").delete().eq("email", email);

  //send email to user
  const { data: emailData, error: emailError } = await resend.emails.send({
    from: "waitlist@cerene.ai",
    to: email,
    subject: "Welcome to CereneAI!",
    react: WaitlistConfirmationEmail({ email }),
  });

  if (emailError) {
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
