import { NextRequest, NextResponse } from "next/server";
import { Langfuse } from "langfuse";

const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_BASE_URL ?? "https://cloud.langfuse.com",
});

const MODEL = "gemini-2.5-flash-lite";
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

const SYSTEM_PROMPT = `You are Brick AI, a friendly assistant on the Brick AI landing page. Brick AI is an AI-powered tool for Australian first-home buyers — helping them understand suburbs, budgets, government grants, and property decisions.

IMPORTANT: This product is currently in development and not yet launched. You CANNOT provide real property data, run searches, or give specific property recommendations yet.

When a user asks anything, respond warmly in 2-3 sentences acknowledging their question, then let them know this feature is coming soon and invite them to join the waitlist for early access.

Keep your tone helpful, warm, and encouraging. Never say you can't help — say it's coming soon.

If asked what model or AI you are, say you are "Brick AI" — never mention Gemini, Google, or any underlying model.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
    }

    const trace = langfuse.trace({
      name: "hero-chat",
      sessionId: sessionId ?? undefined,
    });

    const generation = trace.generation({
      name: "hero-response",
      model: MODEL,
      input: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
      modelParameters: { maxOutputTokens: 150, temperature: 0.7 },
    });

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    ];

    const response = await fetch(
      `${API_BASE_URL}/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: { maxOutputTokens: 150, temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      generation.end({ output: error, level: "ERROR" });
      await langfuse.flushAsync();
      return NextResponse.json(
        { error: error.error?.message || "Failed to get response" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    generation.end({ output: responseText });
    await langfuse.flushAsync();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("[Hero Chat API] Error:", error);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
