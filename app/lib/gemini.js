export async function askGemini(prompt) {
  if (!prompt || prompt.trim() === '') {
    console.error('No prompt provided!');
    return '⚠️ Prompt is missing.';
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error while generating content:', error);
    return '❌ Error occurred while fetching response.';
  }
}
