"use client";

import React, { useState, useMemo, useTransition, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Download,
  RefreshCw,
  LogOut,
  Mail,
  Phone,
  Copy,
  Check,
  Archive,
  RotateCcw,
  CheckCircle2,
  Inbox,
  Clock,
  Sparkles,
} from "lucide-react";
import { logoutLeadsAction, updateLeadStatusAction } from "@/app/leads/actions";

export interface SerializedLead {
  id: string;
  createdAt: string; // ISO string
  name: string;
  email: string;
  phone: string | null;
  message: string;
  interests: string[];
  status: string;
}

interface LeadsDashboardProps {
  leads: SerializedLead[];
}

type FilterStatus = "all" | "new" | "contacted" | "archived";

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHour / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function LeadsDashboard({ leads: initialLeads }: LeadsDashboardProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [optimisticLeads, setOptimisticLeadStatus] = useOptimistic(
    initialLeads,
    (currentLeads, update: { id: string; status: string }) =>
      currentLeads.map((l) => (l.id === update.id ? { ...l, status: update.status } : l))
  );

  const stats = useMemo(() => {
    const total = optimisticLeads.length;
    const newCount = optimisticLeads.filter((l) => l.status === "new").length;
    const contactedCount = optimisticLeads.filter((l) => l.status === "contacted").length;
    const archivedCount = optimisticLeads.filter((l) => l.status === "archived").length;
    return { total, newCount, contactedCount, archivedCount };
  }, [optimisticLeads]);

  const filteredLeads = useMemo(() => {
    return optimisticLeads.filter((lead) => {
      // Status filter
      if (statusFilter !== "all" && lead.status !== statusFilter) {
        return false;
      }
      // Search term
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      const inName = lead.name.toLowerCase().includes(term);
      const inEmail = lead.email.toLowerCase().includes(term);
      const inPhone = lead.phone ? lead.phone.toLowerCase().includes(term) : false;
      const inMessage = lead.message.toLowerCase().includes(term);
      const inInterests = lead.interests.some((i) => i.toLowerCase().includes(term));
      return inName || inEmail || inPhone || inMessage || inInterests;
    });
  }, [optimisticLeads, statusFilter, searchTerm]);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(key);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Fallback
    }
  };

  const handleStatusChange = async (leadId: string, nextStatus: "new" | "contacted" | "archived") => {
    setUpdatingId(leadId);

    startTransition(async () => {
      setOptimisticLeadStatus({ id: leadId, status: nextStatus });
      await updateLeadStatusAction(leadId, nextStatus);
      setUpdatingId(null);
      router.refresh();
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutLeadsAction();
      router.refresh();
    });
  };

  const handleExportCSV = () => {
    if (optimisticLeads.length === 0) return;

    const headers = ["ID", "Date", "Status", "Name", "Email", "Phone", "Interests", "Message"];
    const rows = optimisticLeads.map((l) => [
      l.id,
      `"${new Date(l.createdAt).toISOString()}"`,
      `"${l.status}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${l.interests.join(", ").replace(/"/g, '""')}"`,
      `"${l.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `orvilyn-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-10 md:py-14 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold tracking-tight text-[var(--ink)]">
              Leads
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--orange-tint)] text-[var(--orange-strong)] border border-[var(--orange)]/20">
              Private
            </span>
          </div>
          <p className="text-[var(--muted)] text-sm md:text-base mt-1">
            Incoming inquiries and contact submissions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRefresh}
            title="Refresh leads"
            className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--bg)] transition-[transform,background-color] duration-160 active:scale-[0.97] cursor-pointer"
            aria-label="Refresh"
          >
            <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            disabled={optimisticLeads.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--bg)] font-medium text-sm transition-[transform,background-color] duration-160 active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            title="Lock session"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--ink)] text-[var(--bg)] hover:opacity-90 font-medium text-sm transition-[transform,opacity] duration-160 active:scale-[0.97] cursor-pointer"
          >
            <LogOut size={16} />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`p-5 rounded-[var(--radius-card)] text-left transition-[transform,border-color,box-shadow] duration-160 active:scale-[0.97] cursor-pointer border ${
            statusFilter === "all"
              ? "bg-[var(--surface)] border-[var(--ink)] shadow-[var(--shadow-card)] ring-2 ring-[var(--ink)]/10"
              : "bg-[var(--surface)] border-[var(--line)] hover:border-[var(--muted)]"
          }`}
        >
          <div className="flex items-center justify-between text-[var(--muted)] mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Total</span>
            <Inbox size={16} />
          </div>
          <div className="text-3xl font-extrabold text-[var(--ink)] font-[var(--font-display)]">
            {stats.total}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("new")}
          className={`p-5 rounded-[var(--radius-card)] text-left transition-[transform,border-color,box-shadow] duration-160 active:scale-[0.97] cursor-pointer border ${
            statusFilter === "new"
              ? "bg-[var(--orange-tint)] border-[var(--orange)] shadow-[var(--shadow-card)] ring-2 ring-[var(--orange)]/20"
              : "bg-[var(--surface)] border-[var(--line)] hover:border-[var(--orange)]/60"
          }`}
        >
          <div className="flex items-center justify-between text-[var(--orange-strong)] mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">New</span>
            <Sparkles size={16} />
          </div>
          <div className="text-3xl font-extrabold text-[var(--orange-strong)] font-[var(--font-display)]">
            {stats.newCount}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("contacted")}
          className={`p-5 rounded-[var(--radius-card)] text-left transition-[transform,border-color,box-shadow] duration-160 active:scale-[0.97] cursor-pointer border ${
            statusFilter === "contacted"
              ? "bg-emerald-50 border-emerald-500 shadow-[var(--shadow-card)] ring-2 ring-emerald-500/20"
              : "bg-[var(--surface)] border-[var(--line)] hover:border-emerald-500/60"
          }`}
        >
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Contacted</span>
            <CheckCircle2 size={16} />
          </div>
          <div className="text-3xl font-extrabold text-emerald-800 font-[var(--font-display)]">
            {stats.contactedCount}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("archived")}
          className={`p-5 rounded-[var(--radius-card)] text-left transition-[transform,border-color,box-shadow] duration-160 active:scale-[0.97] cursor-pointer border ${
            statusFilter === "archived"
              ? "bg-stone-100 border-stone-500 shadow-[var(--shadow-card)] ring-2 ring-stone-500/20"
              : "bg-[var(--surface)] border-[var(--line)] hover:border-stone-400"
          }`}
        >
          <div className="flex items-center justify-between text-[var(--muted)] mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Archived</span>
            <Archive size={16} />
          </div>
          <div className="text-3xl font-extrabold text-[var(--ink)] font-[var(--font-display)]">
            {stats.archivedCount}
          </div>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[var(--surface)] p-2.5 rounded-2xl border border-[var(--line)]">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads..."
            className="w-full bg-[var(--bg)] border-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:bg-[var(--surface)] focus:ring-2 focus:ring-[var(--orange)] outline-none transition-all duration-150"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] hover:text-[var(--ink)] px-1.5 py-0.5 rounded bg-[var(--line)]"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[var(--bg)] rounded-xl self-start sm:self-auto overflow-x-auto">
          {(["all", "new", "contacted", "archived"] as FilterStatus[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-[background-color,color] duration-150 select-none cursor-pointer ${
                statusFilter === tab
                  ? "bg-[var(--surface)] text-[var(--ink)] shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center bg-[var(--surface)] border border-dashed border-[var(--line)] rounded-[var(--radius-card)]">
            <Inbox size={40} className="mx-auto text-[var(--muted)] mb-3 opacity-60" />
            <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--ink)]">
              No leads found
            </h2>
            <p className="text-[var(--muted)] text-sm max-w-sm mx-auto mt-1">
              {searchTerm
                ? "No inquiries matched your search criteria."
                : statusFilter !== "all"
                ? `There are no leads in the "${statusFilter}" category.`
                : "New submissions from the contact form will appear here."}
            </p>
            {(searchTerm || statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="mt-4 px-4 py-2 text-sm font-semibold rounded-xl bg-[var(--bg)] border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--line)] transition-[transform,background-color] duration-160 active:scale-[0.97]"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const isUpdating = updatingId === lead.id;
            const emailCopied = copiedId === `email-${lead.id}`;
            const phoneCopied = copiedId === `phone-${lead.id}`;

            return (
              <article
                key={lead.id}
                className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 md:p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-[box-shadow,border-color] duration-200"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--line)]">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--ink)]">
                        {lead.name}
                      </h3>
                      {lead.status === "new" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--orange-tint)] text-[var(--orange-strong)] border border-[var(--orange)]/30">
                          <Sparkles size={12} />
                          New
                        </span>
                      )}
                      {lead.status === "contacted" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300">
                          <CheckCircle2 size={12} />
                          Contacted
                        </span>
                      )}
                      {lead.status === "archived" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-600 border border-stone-300">
                          <Archive size={12} />
                          Archived
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted)] mt-1">
                      <Clock size={13} />
                      <span title={formatFullDate(lead.createdAt)}>
                        {formatRelativeTime(lead.createdAt)}
                      </span>
                      <span>•</span>
                      <span>{formatFullDate(lead.createdAt)}</span>
                    </div>
                  </div>

                  {/* Status Action Buttons */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {lead.status === "new" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(lead.id, "contacted")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-[transform,background-color] duration-160 active:scale-[0.97] cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Mark Contacted</span>
                      </button>
                    )}

                    {lead.status === "contacted" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(lead.id, "new")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--orange-tint)] text-[var(--orange-strong)] border border-[var(--orange)]/20 hover:bg-[var(--orange-tint)]/80 transition-[transform,background-color] duration-160 active:scale-[0.97] cursor-pointer"
                      >
                        <RotateCcw size={14} />
                        <span>Mark New</span>
                      </button>
                    )}

                    {lead.status !== "archived" ? (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(lead.id, "archived")}
                        title="Archive lead"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg)] border border-transparent hover:border-[var(--line)] transition-[transform,background-color] duration-160 active:scale-[0.97] cursor-pointer"
                      >
                        <Archive size={14} />
                        <span>Archive</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(lead.id, "new")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--bg)] transition-[transform,background-color] duration-160 active:scale-[0.97] cursor-pointer"
                      >
                        <RotateCcw size={14} />
                        <span>Restore</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 text-sm">
                  {/* Email */}
                  <div className="flex items-center justify-between gap-2 p-3 bg-[var(--bg)] rounded-xl border border-[var(--line)]/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Mail size={16} className="text-[var(--orange-strong)] shrink-0" />
                      <a
                        href={`mailto:${lead.email}`}
                        className="font-medium text-[var(--ink)] hover:text-[var(--orange-strong)] truncate transition-colors duration-150"
                      >
                        {lead.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(lead.email, `email-${lead.id}`)}
                      title="Copy email"
                      className="p-1 rounded-md text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors duration-150 shrink-0"
                      aria-label="Copy email"
                    >
                      {emailCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between gap-2 p-3 bg-[var(--bg)] rounded-xl border border-[var(--line)]/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Phone size={16} className="text-[var(--orange-strong)] shrink-0" />
                      {lead.phone ? (
                        <a
                          href={`tel:${lead.phone}`}
                          className="font-medium text-[var(--ink)] hover:text-[var(--orange-strong)] truncate transition-colors duration-150"
                        >
                          {lead.phone}
                        </a>
                      ) : (
                        <span className="text-[var(--muted)] text-xs italic">No phone provided</span>
                      )}
                    </div>
                    {lead.phone && (
                      <button
                        type="button"
                        onClick={() => handleCopy(lead.phone || "", `phone-${lead.id}`)}
                        title="Copy phone"
                        className="p-1 rounded-md text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors duration-150 shrink-0"
                        aria-label="Copy phone"
                      >
                        {phoneCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Interests tags */}
                {lead.interests && lead.interests.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pb-4">
                    {lead.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--bg)] border border-[var(--line)] text-[var(--ink)]"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                )}

                {/* Message Body */}
                <div className="pt-2">
                  <div className="text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-2">
                    Message
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--line)] text-[var(--ink)] text-sm md:text-base leading-relaxed whitespace-pre-wrap select-text">
                    {lead.message}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
