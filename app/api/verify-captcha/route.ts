import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Missing reCAPTCHA token" });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return res
      .status(500)
      .json({ error: "Server misconfiguration: missing secret key" });
  }

  try {
    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${token}`,
      }
    );

    const result = await verifyResponse.json();

    if (!result.success || result.score < 0.5) {
      return res
        .status(403)
        .json({ error: "Failed CAPTCHA verification", score: result.score });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("reCAPTCHA verification failed:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
