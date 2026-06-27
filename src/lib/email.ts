import { siteConfig } from "@/lib/site-data";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendEmail({ to, subject, html, text }: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM ?? `${siteConfig.name} <${siteConfig.email}>`;

  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY is not set — skipping confirmation email to", to);
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
        reply_to: siteConfig.email,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("[email] Resend API error:", response.status, body);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[email] Failed to send confirmation email:", error);
    return false;
  }
}
