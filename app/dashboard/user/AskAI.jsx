// Example React component
"use client";

import { useState } from "react";

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response || "No response");
    } catch (err) {
      console.error("Request failed", err);
      setResponse("Request failed");
    }
  };

  return (
    <div className="p-4">
      <h2>Ask Gemini AI</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
        className="border px-2 py-1"
      />
      <button onClick={handleAsk} className="ml-2 bg-blue-500 text-white px-4 py-1 rounded">
        Ask
      </button>
      <p className="mt-4">{response}</p>
    </div>
  );
}
