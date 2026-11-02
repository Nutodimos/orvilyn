"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { isRateLimited, notifyOwner, saveLead } from "@/lib/leads";
import { validateLead } from "@/lib/validateLead";
import type { ContactState } from "./state";

export type { ContactState };

export async function submitLead(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = typeof formData.get("name") === "string" ? (formData.get("name") as string) : "";
  const email = typeof formData.get("email") === "string" ? (formData.get("email") as string) : "";
  const phone = typeof formData.get("phone") === "string" ? (formData.get("phone") as string) : "";
  const message = typeof formData.get("message") === "string" ? (formData.get("message") as string) : "";
  const interests = formData
    .getAll("interests")
    .map((item) => String(item));
  const company = typeof formData.get("company") === "string" ? (formData.get("company") as string) : "";
  const startedAtRaw = formData.get("startedAt");

  const values = {
    name,
    email,
    phone,
    message,
    interests,
  };

  // Honeypot check: If company is non-empty, return { status: "success" } silently
  if (company.trim().length > 0) {
    return { status: "success" };
  }

  // Timing check: If startedAt is not a number, or Date.now() - startedAt < 3000, also return { status: "success" } silently
  const startedAt = Number(startedAtRaw);
  if (!startedAtRaw || Number.isNaN(startedAt) || Date.now() - startedAt < 3000) {
    return { status: "success" };
  }

  // Validation
  const validation = validateLead(values);
  if (!validation.ok) {
    return {
      status: "error",
      fieldErrors: validation.fieldErrors as Record<string, string>,
      values,
    };
  }

  // Read client IP from headers
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
  const salt = process.env.LEAD_HASH_SALT ?? "";
  const ipHash = createHash("sha256").update(ip + salt).digest("hex");

  // Check rate limit before saving
  if (await isRateLimited(ipHash)) {
    return {
      status: "error",
      message: "That’s a lot of messages from one connection. Please try again later.",
      values,
    };
  }

  // Call saveLead (with ipHash) and notifyOwner with Promise.allSettled
  const results = await Promise.allSettled([
    saveLead({ ...validation.value, ipHash }),
    notifyOwner(validation.value),
  ]);

  const atLeastOneOk = results.some(
    (res) => res.status === "fulfilled" && res.value.ok === true
  );

  if (atLeastOneOk) {
    return { status: "success" };
  }

  return {
    status: "error",
    message: "That didn’t go through. Please try again in a minute.",
    values,
  };
}
