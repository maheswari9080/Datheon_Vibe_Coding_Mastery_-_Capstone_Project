"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How is CreatorFlow AI different from standard AI chat prompts?",
    answer:
      "Standard chatbots give you walls of generic text with zero workflow memory. CreatorFlow links AI generation directly to overarching campaigns, target personas, and tasks. You receive structured output (hooks, body, CTAs, and audience rationale) saved straight to your database with publishing status tracking.",
  },
  {
    question: "Does CreatorFlow guarantee viral views or sales conversions?",
    answer:
      "No. In adherence to our non-negotiable quality framework, we never make inflated or deceptive marketing claims. Algorithms and audiences are dynamic. CreatorFlow eliminates friction, blank-page paralysis, and disorganized planning so you can execute consistently with high craft.",
  },
  {
    question: "How is my campaign and content data secured?",
    answer:
      "We implement Supabase PostgreSQL with strict Row-Level Security (RLS) policies. Every query is scoped to your authenticated user UUID at the database engine level. No user or organization can ever view or mutate another tenant's records.",
  },
  {
    question: "Which AI providers and models power the Content Studio?",
    answer:
      "The server architecture supports OpenAI (GPT-4o), Google Gemini 1.5/2.0, and Anthropic Claude 3.5. All API keys remain isolated on the server side and are never leaked to client browser bundles.",
  },
  {
    question: "Can I test CreatorFlow locally without entering an API key?",
    answer:
      "Yes! CreatorFlow features a zero-friction fallback generator mode that produces structured sample outputs when API keys are absent, ensuring you can review the full UI, database CRUD workflows, and export flows seamlessly.",
  },
  {
    question: "Can I manage publishing statuses and deadlines for multiple platforms?",
    answer:
      "Yes. Every piece of content can be linked to a specific campaign with statuses ranging from 'Idea' to 'Published', accompanied by campaign task checklists with due dates.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-card/30 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Answers & Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Clear, honest answers about our technology, data ownership, and capabilities.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-border bg-card/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
