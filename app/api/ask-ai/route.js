import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(req) {
  const body = await req.json();
  const prompt = body.prompt;

  if (!prompt) {
    return new Response(JSON.stringify({ message: "Prompt missing" }), {
      status: 400,
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",    // or "gemini-2.5-pro" if you want Pro
      contents: prompt,              // pass prompt string here
    });

    return new Response(
      JSON.stringify({ response: response.text }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ Gemini Error:", err);
    return new Response(JSON.stringify({ message: "Gemini Error" }), {
      status: 500,
    });
  }
}
