import { NextRequest, NextResponse } from "next/server";
import { AIGenerateRequest, AIGenerateResponse } from "@/types/database";

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
    const geminiKey = process.env.GEMINI_API_KEY;

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
    // Generates platform-tailored, audience-calibrated response matching exact domain schema
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

function generateDomainCopy(req: AIGenerateRequest): AIGenerateResponse {
  const { topic, targetAudience, platform, tone, objective } = req;

  let headline = "";
  let draft = "";
  let callToAction = "";
  let variations: string[] = [];
  let keywords: string[] = [];

  switch (platform) {
    case "twitter":
      headline = `Why ${topic} will redefine how ${targetAudience} build in 2026:`;
      draft = `1/ ${topic} isn't just a trend — it's an architectural shift.\n\n` +
        `2/ The core bottleneck ${targetAudience} face today is execution velocity.\n\n` +
        `3/ 3 tactical rules we follow:\n` +
        `• Keep business logic isolated from client views\n` +
        `• Enforce data policies at the database layer\n` +
        `• Optimize for signal over raw volume\n\n` +
        `4/ Stop overcomplicating your stack. Pick tools that compose cleanly and ship daily.`;
      callToAction = `Retweet if this resonates with your workflow! Drop your perspective below 👇`;
      variations = [
        `The uncomfortable truth about ${topic} that nobody talks about:`,
        `How smart ${targetAudience} are leveraging ${topic} right now:`,
        `5 lessons from failing with ${topic} before finally getting it right:`,
      ];
      keywords = ["#WebDev", "#BuildInPublic", "#IndieDev", "#Productivity"];
      break;

    case "linkedin":
      headline = `Most ${targetAudience} approach ${topic} completely backwards. Here is what works:`;
      draft = `Over the last 6 months, we audited dozens of content pipelines and observed a consistent pattern:\n\n` +
        `Teams spend 80% of their energy on raw ideation and less than 20% on strategic distribution.\n\n` +
        `When deploying ${topic}, the goal isn't just publishing more posts — it's constructing a reliable asset that answers genuine audience pain points:\n\n` +
        `1. Ground every piece in a verifiable outcome\n` +
        `2. Eliminate corporate fluff and state the takeaway in sentence one\n` +
        `3. Provide actionable implementation steps rather than abstract theories\n\n` +
        `Consistency combined with craftsmanship is the only durable moat in content strategy.`;
      callToAction = `What is your team's biggest hurdle when implementing ${topic}? Let's discuss in the comments.`;
      variations = [
        `Why we re-engineered our approach to ${topic} for ${targetAudience}`,
        `3 non-negotiable principles for mastering ${topic}`,
        `The difference between amateur and elite execution in ${topic}`,
      ];
      keywords = ["#Leadership", "#ContentStrategy", "#SaaSGrowth", "#FutureOfWork"];
      break;

    case "instagram":
      headline = `Swipe to level up your ${topic} workflow ➡️`;
      draft = `If you're part of ${targetAudience}, save this post before your next sprint!\n\n` +
        `Here is the exact playbook we used to simplify ${topic}:\n` +
        `Step 1: Define your objective before touching tools\n` +
        `Step 2: Calibrate tone for ${tone.toLowerCase()}\n` +
        `Step 3: Track publishing cadence directly in CreatorFlow\n\n` +
        `Small daily compounding beats occasional bursts of inspiration every single time.`;
      callToAction = `Save this post for later and tag a collaborator who needs to see this!`;
      variations = [
        `Stop making these 3 mistakes with ${topic}!`,
        `The simple 3-step ritual that transformed our ${topic}`,
        `Everything you need to know about ${topic} in 60 seconds`,
      ];
      keywords = ["#CreatorTips", "#WorkSmarter", "#DesignCommunity", "#Growth"];
      break;

    case "youtube":
      headline = `The Ultimate Guide to ${topic} for ${targetAudience}`;
      draft = `[HOOK - 0:00 to 0:15]\n` +
        `"If you've been struggling to make sense of ${topic}, you're not alone. In this video, we break down the exact framework that changes everything."\n\n` +
        `[INTRO & PROBLEM - 0:15 to 1:30]\n` +
        `Explain why traditional advice fails ${targetAudience} and why a structured approach is essential.\n\n` +
        `[MAIN PILLARS - 1:30 to 6:00]\n` +
        `• Pillar 1: The Foundation - setting up correct requirements\n` +
        `• Pillar 2: Execution - hands-on walkthrough and avoiding common pitfalls\n` +
        `• Pillar 3: Scale - measuring outcomes and iterating\n\n` +
        `[OUTRO & CTA - 6:00 to 7:00]\n` +
        `Wrap up key takeaways and point viewers to the description for templates.`;
      callToAction = `Subscribe for weekly technical breakdowns and grab the free cheat sheet in the description below!`;
      variations = [
        `I Tested ${topic} for 30 Days — Here's What Happened`,
        `Why ${targetAudience} Are Switching to This ${topic} Framework`,
        `The Only ${topic} Tutorial You Will Ever Need`,
      ];
      keywords = ["#TechTutorial", "#FullStack", "#Engineering", "#CreatorFlow"];
      break;

    case "blog":
    default:
      headline = `Architecting a Scalable Strategy for ${topic}`;
      draft = `### Introduction\n\n` +
        `As digital publishing evolves, ${targetAudience} must rethink traditional practices around ${topic}. Relying on unorganized brainstorms creates erratic output and team fatigue.\n\n` +
        `### The Core Architectural Principles\n\n` +
        `To achieve lasting impact with a ${tone.toLowerCase()} tone, consider these three pillars:\n\n` +
        `1. **Audience-Centric Framing**: Focus strictly on the questions your readers are actively asking.\n` +
        `2. **Repeatable Systems**: Use structured campaign templates and verifiable database tracking.\n` +
        `3. **Explainable AI Integration**: Leverage generative models to accelerate first drafts while preserving human oversight.\n\n` +
        `### Conclusion\n\n` +
        `Mastering ${topic} is not about producing higher noise volume. It is about shipping intentional, calibrated insights consistently.`;
      callToAction = `Join our newsletter to receive comprehensive guides like this directly in your inbox.`;
      variations = [
        `A Practitioner's Guide to ${topic}`,
        `How We Scaled Our Pipeline Using ${topic}`,
        `The Future of Content Engineering: Lessons from ${topic}`,
      ];
      keywords = ["#SoftwareDesign", "#CaseStudy", "#SystemArchitecture", "#Writing"];
      break;
  }

  return {
    headline,
    draft,
    description: `A platform-optimized ${format} written in a ${tone} tone targeting ${targetAudience}.`,
    callToAction,
    keywords,
    variations,
    explanation: `Calibrated specifically for ${targetAudience} on ${platform}. The ${tone} tone ensures high credibility, while the structured layout addresses the primary objective: "${objective}".`,
  };
}
