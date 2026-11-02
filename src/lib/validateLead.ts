export const INTERESTS = [
  "Website",
  "Web app",
  "Internal tool",
  "Mobile app",
  "Motion design",
  "Not sure yet",
] as const;

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  interests: string[];
};

export type ValidateLeadResult =
  | { ok: true; value: LeadInput }
  | {
      ok: false;
      fieldErrors: Partial<
        Record<"name" | "email" | "phone" | "message" | "interests", string>
      >;
    };

export function validateLead(raw: unknown): ValidateLeadResult {
  const rawObj =
    typeof raw === "object" && raw !== null
      ? (raw as Record<string, unknown>)
      : {};

  const name = typeof rawObj.name === "string" ? rawObj.name.trim() : "";
  const email = typeof rawObj.email === "string" ? rawObj.email.trim() : "";
  const phone = typeof rawObj.phone === "string" ? rawObj.phone.trim() : "";
  const message =
    typeof rawObj.message === "string" ? rawObj.message.trim() : "";

  let interests: string[] = [];
  if (Array.isArray(rawObj.interests)) {
    interests = rawObj.interests.filter(
      (item): item is string => typeof item === "string"
    );
  }

  const fieldErrors: Partial<
    Record<"name" | "email" | "phone" | "message" | "interests", string>
  > = {};

  // Name: 2-80 chars
  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = "Please tell us your name.";
  }

  // Email: matches /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ and is at most 254 chars
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (email.length === 0 || email.length > 254 || !emailRegex.test(email)) {
    fieldErrors.email = "That email doesn’t look right.";
  }

  // Phone: optional, but if present must be 6-20 chars made only of digits, spaces, +, -, ( and )
  const phoneRegex = /^[0-9\s+\-()]+$/;
  if (
    phone.length > 0 &&
    (phone.length < 6 || phone.length > 20 || !phoneRegex.test(phone))
  ) {
    fieldErrors.phone = "That number doesn’t look right.";
  }

  // Message: 10-2000 chars
  if (message.length < 10 || message.length > 2000) {
    fieldErrors.message = "Give us a little more detail (at least 10 characters).";
  }

  // Interests: every item must be in INTERESTS, max 6
  const validInterests = (INTERESTS as readonly string[]);
  const isInterestsValid =
    interests.length <= 6 &&
    interests.every((item) => validInterests.includes(item));

  if (!isInterestsValid) {
    fieldErrors.interests = "Please pick from the options shown.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      message,
      interests,
    },
  };
}
