import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, base64, fileName } = await req.json();

    if (!base64 || base64.length < 50) {
      return NextResponse.json({ error: "Empty or invalid PDF base64." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64, // ✅ No prefix
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (err) {
    console.error("❌ PDF Analysis Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
