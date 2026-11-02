import { Resend } from "resend";
import { prisma } from "./db";
import type { LeadInput } from "./validateLead";

export async function saveLead(
  lead: LeadInput & { ipHash?: string }
): Promise<{ ok: boolean }> {
  try {
    await prisma.lead.create({
      data: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone && lead.phone.trim() !== "" ? lead.phone.trim() : null,
        message: lead.message,
        interests: lead.interests,
        ipHash: lead.ipHash ?? null,
      },
    });
    return { ok: true };
  } catch {
    console.error("[lead] save failed");
    return { ok: false };
  }
}

export async function notifyOwner(lead: LeadInput): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    return { ok: false };
  }

  try {
    const resend = new Resend(apiKey);
    const phoneText = lead.phone && lead.phone.trim() !== "" ? lead.phone.trim() : "not given";
    const interestsText = lead.interests.length > 0 ? lead.interests.join(", ") : "none picked";

    const text = `Name: ${lead.name}
Email: ${lead.email}
Phone: ${phoneText}
Interests: ${interestsText}

${lead.message}`;

    // TODO: when the domain is verified in Resend, change `from` to leads@<your-domain>.
    const { error } = await resend.emails.send({
      from: "Orvilyn Leads <onboarding@resend.dev>",
      to: [notifyEmail],
      replyTo: lead.email,
      subject: `New lead: ${lead.name}`,
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
    return count >= 3;
  } catch {
    return false;
  }
}
