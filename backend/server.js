import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateTrip } from './geminiHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow specific origins for CORS
const allowedOrigins = ['https://ai-travel-planner-dhruv.vercel.app', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// ✅ Express JSON parser
app.use(express.json());

// ✅ Route
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

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
