import React from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { InteractivePreview } from "@/components/landing/InteractivePreview";
import { Features } from "@/components/landing/Features";
import { Workflow } from "@/components/landing/Workflow";
import { UseCases } from "@/components/landing/UseCases";
import { FAQ } from "@/components/landing/FAQ";
import { LeadForm } from "@/components/landing/LeadForm";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <InteractivePreview />
        <Features />
        <Workflow />
        <UseCases />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
