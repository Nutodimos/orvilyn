"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import {
  checkAdminSession,
  clearAdminSession,
  clearFailedLogins,
  isLoginRateLimited,
  recordFailedLogin,
  setAdminSession,
  verifyPassword,
} from "@/lib/leads-auth";

export async function loginLeadsAction(passcode: string): Promise<{ success: boolean; error?: string }> {
  if (!passcode || typeof passcode !== "string") {
    return { success: false, error: "Please enter your passcode." };
  }

  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  if (isLoginRateLimited(ip)) {
    return {
      success: false,
      error: "Too many failed attempts. Please wait 15 minutes before trying again.",
    };
  }

  const isValid = verifyPassword(passcode);
  if (!isValid) {
    recordFailedLogin(ip);
    return { success: false, error: "Incorrect passcode. Please try again." };
  }

  clearFailedLogins(ip);
  await setAdminSession();
  revalidatePath("/leads");
  return { success: true };
}

export async function logoutLeadsAction(): Promise<{ success: boolean }> {
  await clearAdminSession();
  revalidatePath("/leads");
  return { success: true };
}

export async function updateLeadStatusAction(
  leadId: string,
  newStatus: "new" | "contacted" | "archived"
): Promise<{ success: boolean; error?: string }> {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return { success: false, error: "Session expired. Please log in again." };
  }

  if (!["new", "contacted", "archived"].includes(newStatus)) {
    return { success: false, error: "Invalid status value." };
  }

  try {
    const updated = await prisma.lead.update({
      where: { id: leadId },
      data: { status: newStatus },
      select: { id: true },
    });

    if (!updated) {
      return { success: false, error: "Lead not found." };
    }

    revalidatePath("/leads");
    return { success: true };
  } catch {
    return { success: false, error: "Unable to update status. Please try again." };
  }
}
