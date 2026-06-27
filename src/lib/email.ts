import { siteConfig } from "@/lib/site-data";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type SendEmailResult = {
  sent: boolean;
  error?: string;
  id?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailParams): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM ?? `${siteConfig.name} <${siteConfig.email}>`;

  if (!apiKey) {
    const error = "RESEND_API_KEY is not set";
    console.warn(`[email] ${error} — skipping confirmation email to ${to}`);
    return { sent: false, error };
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

    const body = await response.text();

    if (!response.ok) {
      console.error("[email] Resend API error:", response.status, body, { from, to });
      return { sent: false, error: body };
    }

    let id: string | undefined;
    try {
      id = (JSON.parse(body) as { id?: string }).id;
    } catch {
      id = undefined;
    }

    console.info("[email] Sent confirmation email", { id, from, to });
    return { sent: true, id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[email] Failed to send confirmation email:", message, { to });
    return { sent: false, error: message };
  }
}
