import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export async function generateTrip(FINAL_PROMPT) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: 'text/plain',
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: FINAL_PROMPT }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash',
    config,
    contents,
  });

  let fullText = '';
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  // Remove markdown formatting
  const cleaned = fullText
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  // ✅ Try parsing directly
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn("⚠️ Initial JSON.parse failed:", err.message);

    // ✅ Try a second-pass fix: Fix trailing commas
    try {
      const fixed = cleaned.replace(/,\s*([}\]])/g, '$1'); // remove trailing commas
      return JSON.parse(fixed);
    } catch (secondErr) {
      console.error('❌ Still invalid JSON:', secondErr.message);
      return { error: 'Invalid JSON format from Gemini', raw: cleaned };
    }
  }
}
