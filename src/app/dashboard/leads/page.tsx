"use client";

import React, { useState, useEffect } from "react";
import { Users, Mail, Clock, MessageSquare, ShieldCheck, Search } from "lucide-react";
import { dataStore } from "@/lib/store";
import { Lead } from "@/types/database";
import { formatDate } from "@/lib/utils";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLeads(dataStore.getLeads());
  }, []);

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.message && l.message.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
          <Users className="w-6 h-6 text-primary" /> Inbound Inquiries & Leads
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Review potential enterprise clients and collaborators captured from your public landing page.
        </p>
      </div>

      <div className="p-4 rounded-2xl border border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Protected by Database Row-Level Security policies</span>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-border bg-card/40 space-y-3">
          <Users className="w-10 h-10 text-muted-foreground/60 mx-auto" />
          <h3 className="text-base font-bold text-foreground">No inquiries found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Inbound leads submitted via the landing page contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-foreground">{lead.name}</h3>
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5" /> {lead.email}
                  </a>
                </div>
                <span className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {formatDate(lead.created_at)}
                </span>
              </div>

              {lead.message && (
                <div className="p-3.5 rounded-xl border border-border/80 bg-secondary/40 text-xs text-foreground/90 flex items-start gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{lead.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
