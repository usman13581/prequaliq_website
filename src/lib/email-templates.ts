import { formatMeetingForDisplay } from "@/lib/meeting";
import { siteConfig } from "@/lib/site-data";

type Locale = "en" | "sv";

type ContactEmailContent = {
  subject: string;
  html: string;
  text: string;
};

type ProjectEmailContent = ContactEmailContent;

function wrapHtml(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e293b; max-width: 560px; margin: 0 auto; padding: 24px;">
    <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;">${siteConfig.name}</p>
    ${body}
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
    <p style="margin: 0; font-size: 13px; color: #64748b;">
      ${siteConfig.name} · ${siteConfig.email}<br />
      ${siteConfig.address}
    </p>
  </body>
</html>`;
}

export function buildContactConfirmationEmail(
  name: string,
  locale: Locale,
): ContactEmailContent {
  if (locale === "sv") {
    return {
      subject: "Vi har tagit emot ditt meddelande — PrequaliQ",
      text: `Hej ${name},

Tack för att du kontaktade PrequaliQ. Vi har tagit emot ditt meddelande och återkommer inom en arbetsdag.

Med vänliga hälsningar,
PrequaliQ
${siteConfig.email}`,
      html: wrapHtml(`
    <h1 style="font-size: 20px; margin: 0 0 16px;">Vi har tagit emot ditt meddelande</h1>
    <p>Hej ${name},</p>
    <p>Tack för att du kontaktade PrequaliQ. Vi har tagit emot ditt meddelande och återkommer inom en arbetsdag.</p>
    <p>Med vänliga hälsningar,<br /><strong>PrequaliQ</strong></p>
  `),
    };
  }

  return {
    subject: "We received your message — PrequaliQ",
    text: `Hi ${name},

Thank you for contacting PrequaliQ. We have received your message and will respond within one business day.

Best regards,
PrequaliQ
${siteConfig.email}`,
    html: wrapHtml(`
    <h1 style="font-size: 20px; margin: 0 0 16px;">We received your message</h1>
    <p>Hi ${name},</p>
    <p>Thank you for contacting PrequaliQ. We have received your message and will respond within one business day.</p>
    <p>Best regards,<br /><strong>PrequaliQ</strong></p>
  `),
  };
}

export function buildProjectConfirmationEmail(
  name: string,
  locale: Locale,
  meetingDate: string | null,
  meetingTime: string | null,
): ProjectEmailContent {
  const hasMeeting = Boolean(meetingDate && meetingTime);
  const meetingLabel =
    hasMeeting && meetingDate && meetingTime
      ? formatMeetingForDisplay(meetingDate, meetingTime, locale)
      : null;

  if (locale === "sv") {
    const meetingParagraph = hasMeeting
      ? `<p>Du har bokat ett möte ${meetingLabel}. En representant från PrequaliQ kommer att vara tillgänglig vid den begärda tiden.</p>`
      : `<p>Vi går igenom dina projektuppgifter och återkommer inom en arbetsdag.</p>`;

    return {
      subject: "Din projektförfrågan har mottagits — PrequaliQ",
      text: `Hej ${name},

Tack för din projektförfrågan. Vi har tagit emot dina uppgifter.
${hasMeeting ? `\nDu har bokat ett möte ${meetingLabel}. En representant från PrequaliQ kommer att vara tillgänglig vid den begärda tiden.` : "\nVi går igenom dina projektuppgifter och återkommer inom en arbetsdag."}

Med vänliga hälsningar,
PrequaliQ
${siteConfig.email}`,
      html: wrapHtml(`
    <h1 style="font-size: 20px; margin: 0 0 16px;">Din projektförfrågan har mottagits</h1>
    <p>Hej ${name},</p>
    <p>Tack för din projektförfrågan. Vi har tagit emot dina uppgifter.</p>
    ${meetingParagraph}
    <p>Med vänliga hälsningar,<br /><strong>PrequaliQ</strong></p>
  `),
    };
  }

  const meetingParagraph = hasMeeting
    ? `<p>You scheduled a meeting for <strong>${meetingLabel}</strong>. A PrequaliQ representative will be available at your requested time.</p>`
    : `<p>We will review your project details and respond within one business day.</p>`;

  return {
    subject: "Your project request was received — PrequaliQ",
    text: `Hi ${name},

Thank you for sharing your project details with PrequaliQ. We have received your information.
${hasMeeting ? `\nYou scheduled a meeting for ${meetingLabel}. A PrequaliQ representative will be available at your requested time.` : "\nWe will review your project details and respond within one business day."}

Best regards,
PrequaliQ
${siteConfig.email}`,
    html: wrapHtml(`
    <h1 style="font-size: 20px; margin: 0 0 16px;">Your project information was received</h1>
    <p>Hi ${name},</p>
    <p>Thank you for sharing your project details with PrequaliQ. We have received your information.</p>
    ${meetingParagraph}
    <p>Best regards,<br /><strong>PrequaliQ</strong></p>
  `),
  };
}
