// // inside your POST handler
const prompt = `
You are a trusted medical AI assistant trained in clinical diagnosis.

A patient reports the following symptoms:
${symptoms}

Please analyze the symptoms and respond in this exact format:

Analysis Complete

Possible Conditions
[Condition 1]
[Severity: Low/Medium/High]
[Confidence: %]

[Condition 2]
[Severity]
[Confidence]

[Condition 3]
[Severity]
[Confidence]

Identified Syndromes with Codes
[Syndrome Name 1] - [Code 1]
[Syndrome Name 2] - [Code 2]

Doctor's Recommendations
- Medicines Needed:
  [List medicines or drug classes recommended]
- Tests Required:
  [List diagnostic tests, e.g., blood tests, imaging, pathology]
- Specialist Consultations:
  [List types of doctors the patient should see, e.g., cardiologist, dermatologist]
- At-home Care:
  [Practical care suggestions to do at home]
- When to Seek Emergency Care:
  [Conditions or symptoms that require urgent physician visit]


Medical Disclaimer
This AI-generated advice is for informational purposes only and should not be considered a substitute for professional medical consultation.
`;

const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: [{ role: "user", parts: [{ text: prompt }] }],
});

const generated = await result.response.text();

return new Response(
  JSON.stringify({ response: generated }),
  {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }
);
