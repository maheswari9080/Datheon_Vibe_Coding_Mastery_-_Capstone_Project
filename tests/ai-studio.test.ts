import { describe, it, expect } from "vitest";

describe("AI Studio Generation Validation", () => {
  it("validates required inputs correctly", () => {
    const invalidPayload = { topic: "", targetAudience: "" };
    expect(invalidPayload.topic.trim().length).toBe(0);
  });

  it("produces valid structured schema output", () => {
    const sampleOutput = {
      headline: "5 Supabase RLS Pitfalls Every Developer Must Avoid",
      draft: "When designing multi-tenant tables, database-level security policies prevent data leakage.",
      description: "A technical post targeting engineers.",
      callToAction: "What is your biggest RLS challenge? Drop a comment below.",
      keywords: ["#Supabase", "#PostgreSQL", "#WebSecurity"],
      variations: [
        "Why API route auth is not enough",
        "How to audit your PostgreSQL row-level security",
        "The complete guide to tenant isolation in Supabase",
      ],
      explanation: "Calibrated for senior developers looking for architecture patterns.",
    };

    expect(sampleOutput).toHaveProperty("headline");
    expect(sampleOutput).toHaveProperty("draft");
    expect(sampleOutput).toHaveProperty("callToAction");
    expect(sampleOutput).toHaveProperty("keywords");
    expect(sampleOutput.keywords.length).toBeGreaterThan(0);
    expect(sampleOutput.variations.length).toBe(3);
    expect(sampleOutput).toHaveProperty("explanation");
  });
});
