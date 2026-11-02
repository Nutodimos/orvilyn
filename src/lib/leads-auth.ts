import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "leads_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

interface AttemptRecord {
  count: number;
  firstAttempt: number;
}

// In-memory sliding rate-limiter for login attempts per IP
const failedAttemptsMap = new Map<string, AttemptRecord>();

export function isLoginRateLimited(ip: string): boolean {
  const record = failedAttemptsMap.get(ip);
  if (!record) return false;

  if (Date.now() - record.firstAttempt > LOCKOUT_WINDOW_MS) {
    failedAttemptsMap.delete(ip);
    return false;
  }

  return record.count >= MAX_FAILED_ATTEMPTS;
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const record = failedAttemptsMap.get(ip);
  if (!record || now - record.firstAttempt > LOCKOUT_WINDOW_MS) {
    failedAttemptsMap.set(ip, { count: 1, firstAttempt: now });
  } else {
    record.count += 1;
  }
}

export function clearFailedLogins(ip: string): void {
  failedAttemptsMap.delete(ip);
}

export function getAdminPassword(): string {
  return process.env.LEADS_ADMIN_PASSWORD || "orvilyn-leads-2026";
}

function getSigningSecret(): string {
  const salt = process.env.LEAD_HASH_SALT || "orvilyn-leads-session-secret";
  return `${getAdminPassword()}:${salt}`;
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const secret = getSigningSecret();
  const hmac = createHmac("sha256", secret).update(timestamp).digest("hex");
  return `${timestamp}.${hmac}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = Number(timestampStr);
  if (Number.isNaN(timestamp)) return false;

  // Expire after 30 days
  const maxAgeMs = SESSION_MAX_AGE_SECONDS * 1000;
  if (Date.now() - timestamp > maxAgeMs) return false;

  const secret = getSigningSecret();
  const expectedHmac = createHmac("sha256", secret).update(timestampStr).digest("hex");

  try {
    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedHmac, "hex");
    if (sigBuffer.length !== expectedBuffer.length) return false;
    return timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function verifyPassword(inputPassword: string): boolean {
  const actualPassword = getAdminPassword();
  try {
    const inputBuf = Buffer.from(inputPassword.trim());
    const actualBuf = Buffer.from(actualPassword.trim());
    if (inputBuf.length !== actualBuf.length) return false;
    return timingSafeEqual(inputBuf, actualBuf);
  } catch {
    return false;
  }
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(sessionCookie);
}

export async function setAdminSession(): Promise<void> {
  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
