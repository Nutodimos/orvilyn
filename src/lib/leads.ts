import { Resend } from "resend";
import { prisma } from "./db";
import type { LeadFormData } from "./leadSchema";

export interface ExtendedLeadInput {
  name: string;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  contactMethod?: string;
  service?: string | null;
  budgetRange?: string | null;
  region?: string | null;
  message: string;
  interests?: string[];
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  fbclid?: string | null;
  gclid?: string | null;
  landingPage?: string | null;
  referrer?: string | null;
  ipHash?: string | null;
}

export async function saveLead(
  lead: ExtendedLeadInput
): Promise<{ ok: boolean }> {
  try {
    const interestsList = lead.interests && lead.interests.length > 0
      ? lead.interests
      : lead.service ? [lead.service] : [];

    await prisma.lead.create({
      data: {
        name: lead.name,
        email: lead.email && lead.email.trim() !== "" ? lead.email.trim() : null,
        phone: lead.phone && lead.phone.trim() !== "" ? lead.phone.trim() : null,
        whatsapp: lead.whatsapp && lead.whatsapp.trim() !== "" ? lead.whatsapp.trim() : null,
        contactMethod: lead.contactMethod ?? "email",
        service: lead.service ?? null,
        budgetRange: lead.budgetRange ?? null,
        region: lead.region ?? null,
        message: lead.message,
        interests: interestsList,
        utmSource: lead.utmSource ?? null,
        utmMedium: lead.utmMedium ?? null,
        utmCampaign: lead.utmCampaign ?? null,
        utmContent: lead.utmContent ?? null,
        utmTerm: lead.utmTerm ?? null,
        fbclid: lead.fbclid ?? null,
        gclid: lead.gclid ?? null,
        landingPage: lead.landingPage ?? null,
        referrer: lead.referrer ?? null,
        ipHash: lead.ipHash ?? null,
      },
    });
    return { ok: true };
  } catch (err) {
    console.error("[lead] save failed", err);
    return { ok: false };
  }
}

export async function notifyOwner(lead: ExtendedLeadInput): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    return { ok: false };
  }

  try {
    const resend = new Resend(apiKey);
    const emailText = lead.email && lead.email.trim() !== "" ? lead.email.trim() : "None (chose WhatsApp)";
    const whatsappText = lead.whatsapp && lead.whatsapp.trim() !== "" ? lead.whatsapp.trim() : "None";
    const serviceText = lead.service || (lead.interests && lead.interests.length > 0 ? lead.interests.join(", ") : "Not specified");
    const budgetText = lead.budgetRange || "Not specified";
    const regionText = lead.region || "Not specified";
    const attributionLines = [
      lead.utmSource ? `Source: ${lead.utmSource}` : null,
      lead.utmMedium ? `Medium: ${lead.utmMedium}` : null,
      lead.utmCampaign ? `Campaign: ${lead.utmCampaign}` : null,
      lead.utmContent ? `Content: ${lead.utmContent}` : null,
      lead.utmTerm ? `Term: ${lead.utmTerm}` : null,
      lead.fbclid ? `FBCLID: ${lead.fbclid}` : null,
      lead.gclid ? `GCLID: ${lead.gclid}` : null,
      lead.landingPage ? `Landing: ${lead.landingPage}` : null,
      lead.referrer ? `Referrer: ${lead.referrer}` : null,
    ].filter(Boolean);

    const attributionText = attributionLines.length > 0
      ? attributionLines.join("\n")
      : "Direct / Organic";

    const text = `New Lead Submission:
------------------------------------
Name: ${lead.name}
Preferred Contact: ${lead.contactMethod || "email"}
Email: ${emailText}
WhatsApp: ${whatsappText}
Service Needed: ${serviceText}
Budget Range: ${budgetText}
Region: ${regionText}

What's annoying them / Message:
${lead.message}

Attribution & Marketing:
------------------------------------
${attributionText}
`;

    const { error } = await resend.emails.send({
      from: "Orvilyn Leads <onboarding@resend.dev>",
      to: [notifyEmail],
      replyTo: lead.email || undefined,
      subject: `New lead: ${lead.name} (${serviceText})`,
      text,
    });

    return { ok: !error };
  } catch {
    return { ok: false };
  }
}

export async function sendLeadAutoReply(lead: ExtendedLeadInput): Promise<{ ok: boolean }> {
  if (!lead.email || lead.email.trim() === "") {
    return { ok: true }; // skipped if no email
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false };

  try {
    const resend = new Resend(apiKey);
    const firstName = lead.name.split(" ")[0] || lead.name;

    const text = `Hi ${firstName},

Thanks for reaching out to Orvilyn.

We’ve received your note and will review what you shared. You’ll hear back from a real person within 24 hours (usually sooner).

If you’d like to skip the wait, you can pick a time on our calendar or chat with us on WhatsApp anytime:
https://wa.me/2348071658176

Talk soon,
The Orvilyn Team
https://orvilyn.com
`;

    const { error } = await resend.emails.send({
      from: "Orvilyn <onboarding@resend.dev>",
      to: [lead.email.trim()],
      subject: "We got your message – Orvilyn",
      text,
    });

    return { ok: !error };
  } catch {
    return { ok: false };
  }
}

export async function isRateLimited(ipHash: string): Promise<boolean> {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const count = await prisma.lead.count({
      where: {
        ipHash,
        createdAt: {
          gte: oneHourAgo,
        },
      },
    });
    return count >= 5; // generous rate limit
  } catch {
    return false;
  }
}
