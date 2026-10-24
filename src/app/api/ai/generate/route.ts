import { NextRequest, NextResponse } from "next/server";
import { AIGenerateRequest, AIGenerateResponse } from "@/types/database";
import { generateDomainCopy } from "@/lib/ai/generator";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AIGenerateRequest;

    // 1. Validation & Input Sanitation
    if (!body.topic || typeof body.topic !== "string" || body.topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Content topic is required and must be non-empty." },
        { status: 400 }
      );
    }

    if (body.topic.length > 500) {
      return NextResponse.json(
        { error: "Topic exceeds maximum character length (500 chars)." },
        { status: 400 }
      );
    }

    if (!body.targetAudience || typeof body.targetAudience !== "string") {
      return NextResponse.json(
        { error: "Target audience is required for calibrated generation." },
        { status: 400 }
      );
    }

    const validPlatforms = ["twitter", "linkedin", "instagram", "youtube", "blog"];
    const platform = validPlatforms.includes(body.platform) ? body.platform : "linkedin";

    const topic = body.topic.trim();
    const audience = body.targetAudience.trim();
    const tone = body.tone?.trim() || "Professional & Insightful";
    const objective = body.objective?.trim() || "Engagement & Education";
    const format = body.contentType || "post";

    // 2. Provider Check (OpenAI / Gemini / Anthropic)
    const openAiKey = process.env.OPENAI_API_KEY;

    if (openAiKey && openAiKey !== "your_openai_api_key") {
      try {
        const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content:
                  "You are CreatorFlow AI, an elite content strategist. Generate structured content matching the user parameters. Return ONLY valid JSON with keys: headline, draft, description, callToAction, keywords (array), variations (array of 3 strings), explanation.",
              },
              {
                role: "user",
                content: JSON.stringify({ topic, audience, platform, tone, objective, format }),
              },
            ],
            temperature: 0.7,
          }),
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          const parsed: AIGenerateResponse = JSON.parse(aiData.choices[0].message.content);
          return NextResponse.json(parsed);
        }
      } catch (e) {
        console.warn("OpenAI API call failed, falling back to local studio engine:", e);
      }
    }

    // 3. Built-In Intelligent Studio Engine (Fallback / Zero-Key Demo Mode)
    const structuredResponse: AIGenerateResponse = generateDomainCopy({
      topic,
      targetAudience: audience,
      platform,
      contentType: format,
      tone,
      objective,
      keywords: body.keywords,
    });

    return NextResponse.json(structuredResponse, { status: 200 });
  } catch (error: any) {
    console.error("AI Generation error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during content generation." },
      { status: 500 }
    );
  }
}
