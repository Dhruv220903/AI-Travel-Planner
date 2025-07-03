// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateTrip } from './geminiHandler.js';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/generate-trip', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await generateTrip(prompt);
    res.json({ response });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
