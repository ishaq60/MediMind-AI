import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === "") {
      return new Response(JSON.stringify({ error: "Message missing" }), { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    return new Response(
      JSON.stringify({ reply: response.text }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get AI response" }),
      { status: 500 }
    );
  }
}
