import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  checkAdminSession,
  getAdminPassword,
  setAdminSession,
} from "@/lib/leads-auth";
import { LeadsGate } from "@/components/leads/LeadsGate";
import {
  LeadsDashboard,
  type SerializedLead,
} from "@/components/leads/LeadsDashboard";

export const metadata: Metadata = {
  title: "Leads",
  robots: {
    index: false,
    follow: false,
  },
};

interface LeadsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function LeadsContent({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const queryToken = typeof params.token === "string" ? params.token : undefined;

  const isAuth = await checkAdminSession();

  // If query token matches, set session and immediately redirect to clean URL
  if (!isAuth && queryToken && queryToken.trim() === getAdminPassword().trim()) {
    await setAdminSession();
    redirect("/leads");
  }

  if (!isAuth) {
    return <LeadsGate />;
  }

  const rawLeads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedLeads: SerializedLead[] = rawLeads.map((l) => ({
    id: l.id,
    createdAt: l.createdAt.toISOString(),
    name: l.name,
    email: l.email,
    phone: l.phone,
    message: l.message,
    interests: l.interests,
    status: l.status,
    service: l.service,
    budgetRange: l.budgetRange,
    contactMethod: l.contactMethod,
    whatsapp: l.whatsapp,
    region: l.region,
    utmSource: l.utmSource,
    utmMedium: l.utmMedium,
    utmCampaign: l.utmCampaign,
    landingPage: l.landingPage,
    referrer: l.referrer,
  }));

  return <LeadsDashboard leads={serializedLeads} />;
}

function LeadsLoadingFallback() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-10 md:py-14 space-y-8 animate-pulse">
      <div className="h-10 w-48 bg-[var(--line)] rounded-xl" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)]" />
        ))}
      </div>
      <div className="h-14 bg-[var(--surface)] border border-[var(--line)] rounded-2xl" />
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-44 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)]" />
        ))}
      </div>
    </div>
  );
}

export default function LeadsPage({ searchParams }: LeadsPageProps) {
  return (
    <Suspense fallback={<LeadsLoadingFallback />}>
      <LeadsContent searchParams={searchParams} />
    </Suspense>
  );
}
