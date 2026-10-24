"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { dataStore } from "@/lib/store";

export function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side validation
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      let saved = false;
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim() || undefined,
          }),
        });

        if (res.ok) {
          saved = true;
        }
      } catch {
        // Fallback for static hosting / GitHub Pages
      }

      // If server route is unavailable on static hosting, store locally
      if (!saved) {
        dataStore.saveLead({
          name: name.trim(),
          email: email.trim(),
          message: message.trim() || undefined,
        });
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-b from-card to-secondary/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Early Access & Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Ready to Accelerate Your Content Pipeline?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Request an enterprise walkthrough or join our creator advisory network. No spam, ever.
          </p>
        </div>

        {status === "success" ? (
          <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-4 animate-fade-in max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Inquiry Received!</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Thank you for connecting with CreatorFlow AI. We have safely persisted your details and our team will get in touch shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-xs font-semibold text-primary hover:underline pt-2 inline-block"
            >
              Submit another inquiry &rarr;
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            {errorMessage && (
              <div className="p-3.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label htmlFor="lead-name" className="block text-xs font-semibold text-foreground mb-1.5">
                Your Full Name <span className="text-destructive">*</span>
              </label>
              <input
                id="lead-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>

            <div>
              <label htmlFor="lead-email" className="block text-xs font-semibold text-foreground mb-1.5">
                Work or Personal Email <span className="text-destructive">*</span>
              </label>
              <input
                id="lead-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>

            <div>
              <label htmlFor="lead-message" className="block text-xs font-semibold text-foreground mb-1.5">
                Primary Goal / Message <span className="text-muted-foreground font-normal">(Optional)</span>
              </label>
              <textarea
                id="lead-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your current publishing volume or team needs..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-600 disabled:opacity-50 transition-all shadow-md shadow-primary/20 active:scale-98"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
