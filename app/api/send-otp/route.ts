// app/api/send-otp/route.ts
import { createClient } from "@supabase/supabase-js";
import { render } from "@react-email/render";
import { Resend } from "resend";

//email template
import { WaitlistOTPEmail } from "@/emailTemplates/waitlist-otp-email";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  const { error: upsertError } = await supabase
    .from("email_otp_verification")
    .upsert({ email, otp, expires_at: expiresAt });

  if (upsertError) {
    console.error("Supabase error:", upsertError.message);
    return new Response(JSON.stringify({ error: "Failed to store OTP" }), {
      status: 500,
    });
  }

  const { data, error } = await resend.emails.send({
    from: "waitlist@cerene.ai",
    to: email,
    subject: "Your OTP for CereneAI",
    react: WaitlistOTPEmail({ email, otp }),
  });

  if (error) {
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ sent: true }), { status: 200 });
}
