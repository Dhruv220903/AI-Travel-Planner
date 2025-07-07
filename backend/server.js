import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateTrip } from './geminiHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use CORS with origin and preflight handling
app.use(cors({
  origin: ['https://ai-travel-planner-dhruv.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// ✅ Handle preflight requests manually (especially on Render)
app.options('*', cors());

// JSON parser
app.use(express.json());

// Route
app.post('/api/generate-trip', async (req, res) => {
  const { prompt } = req.body;
  try {
    console.log("Received prompt:", prompt);
    const response = await generateTrip(prompt);
    res.json({ response });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: err.message });
    
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
