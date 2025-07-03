// server/geminiHandler.js
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

  return fullText;
}
