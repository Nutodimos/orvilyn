import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Website",
  "Web app",
  "Internal tool",
  "Mobile app",
  "Motion design",
  "Not sure yet",
] as const;

export const BUDGET_RANGES_NGN = [
  "Under ₦500k",
  "₦500k–₦2M",
  "₦2M–₦5M",
  "₦5M+",
  "Not sure yet",
] as const;

export const BUDGET_RANGES_INTL = [
  "Under $500",
  "$500–$2k",
  "$2k–$5k",
  "$5k+",
  "Not sure yet",
] as const;

export const leadFormSchema = z
  .object({
    // Step 1
    service: z.string().min(1, "Please choose an option."),
    
    // Step 2
    message: z
      .string()
      .trim()
      .min(10, "Give us a little more detail (at least 10 characters).")
      .max(2000, "Message is too long."),
      
    // Step 3
    budgetRange: z.string().min(1, "Please select a rough budget."),
    region: z.enum(["NG", "INTL"]).default("NG"),
    
    // Step 4
    name: z.string().trim().min(2, "Please tell us your name.").max(80),
    contactMethod: z.enum(["email", "whatsapp"]).default("email"),
    email: z.string().trim().optional(),
    whatsapp: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    
    // Bot & timing checks
    company: z.string().optional(), // honeypot
    startedAt: z.string().optional(),
    
    // Attribution
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
    utmContent: z.string().optional(),
    utmTerm: z.string().optional(),
    fbclid: z.string().optional(),
    gclid: z.string().optional(),
    landingPage: z.string().optional(),
    referrer: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.contactMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!data.email || !emailRegex.test(data.email) || data.email.length > 254) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "That email doesn’t look right.",
        });
      }
    } else if (data.contactMethod === "whatsapp") {
      const cleanPhone = (data.whatsapp || "").replace(/[^0-9+]/g, "");
      if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["whatsapp"],
          message: "Please enter a valid WhatsApp phone number.",
        });
      }
    }
  });

export type LeadFormData = z.infer<typeof leadFormSchema>;
