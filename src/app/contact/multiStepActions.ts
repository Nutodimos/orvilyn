"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isRateLimited, notifyOwner, saveLead, sendLeadAutoReply } from "@/lib/leads";
import { leadFormSchema } from "@/lib/leadSchema";
import type { MultiStepState } from "./multiStepState";

export async function submitMultiStepLead(
  _prev: MultiStepState,
  formData: FormData
): Promise<MultiStepState> {
  const company = typeof formData.get("company") === "string" ? (formData.get("company") as string) : "";
  const startedAtRaw = formData.get("startedAt");

  // 1. Honeypot check: reject if filled (simulating instant success/silent discard)
  if (company.trim().length > 0) {
    redirect("/thanks");
  }

  // 2. Timing check: bots submitting within 2.5 seconds
  const startedAt = Number(startedAtRaw);
  if (!startedAtRaw || Number.isNaN(startedAt) || Date.now() - startedAt < 2500) {
    redirect("/thanks");
  }

  const rawData = {
    service: formData.get("service"),
    message: formData.get("message"),
    budgetRange: formData.get("budgetRange"),
    region: formData.get("region") || "NG",
    name: formData.get("name"),
    contactMethod: formData.get("contactMethod") || "email",
    email: formData.get("email") || undefined,
    whatsapp: formData.get("whatsapp") || undefined,
    phone: formData.get("phone") || undefined,
    company,
    startedAt: typeof startedAtRaw === "string" ? startedAtRaw : undefined,
    utmSource: formData.get("utmSource") || undefined,
    utmMedium: formData.get("utmMedium") || undefined,
    utmCampaign: formData.get("utmCampaign") || undefined,
    utmContent: formData.get("utmContent") || undefined,
    utmTerm: formData.get("utmTerm") || undefined,
    fbclid: formData.get("fbclid") || undefined,
    gclid: formData.get("gclid") || undefined,
    landingPage: formData.get("landingPage") || undefined,
    referrer: formData.get("referrer") || undefined,
  };

  // 3. Zod schema validation
  const parsed = leadFormSchema.safeParse(rawData);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please double check the highlighted fields.",
      fieldErrors,
    };
  }

  const validLead = parsed.data;

  // 4. IP Hashing & Rate limiting
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
  const salt = process.env.LEAD_HASH_SALT ?? "orvilyn-lead-salt";
  const ipHash = createHash("sha256").update(ip + salt).digest("hex");

  if (await isRateLimited(ipHash)) {
    return {
      status: "error",
      message: "That’s quite a few messages from one connection. Please try again shortly or chat with us on WhatsApp.",
    };
  }

  // 5. Database persistence & Notifications
  const leadPayload = {
    ...validLead,
    ipHash,
  };

  const results = await Promise.allSettled([
    saveLead(leadPayload),
    notifyOwner(leadPayload),
    sendLeadAutoReply(leadPayload),
  ]);

  const saveResult = results[0];
  const isSaved = saveResult.status === "fulfilled" && saveResult.value.ok;

  if (isSaved) {
    redirect("/thanks");
  }

  // If DB save failed but owner notification worked
  const ownerResult = results[1];
  const isOwnerNotified = ownerResult.status === "fulfilled" && ownerResult.value.ok;
  if (isOwnerNotified) {
    redirect("/thanks");
  }

  return {
    status: "error",
    message: "Something went wrong sending your note. Please try again or reach out on WhatsApp.",
  };
}
