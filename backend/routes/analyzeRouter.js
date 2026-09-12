const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { authenticate } = require("../middleware/authenticate");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// Preferred models, tried in order. gemini-flash-latest is a stable alias that
// always resolves to the current Flash model (pinned models like
// gemini-1.5-flash / gemini-2.5-flash get retired or blocked for new keys).
const MODEL_CHAIN = [
  process.env.GEMINI_MODEL,
  "gemini-flash-latest",
  "gemini-2.5-flash",
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const generateWithFallback = async (prompt) => {
  let lastError;
  for (const modelName of MODEL_CHAIN) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });
    // Retry transient failures (503 high demand / 429 rate limit / 500)
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        });
        const text =
          response.response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
        lastError = new Error("Empty response from model");
      } catch (err) {
        const status = err.status || err.response?.status;
        const transient = [429, 500, 503].includes(status);
        if (!transient || attempt === 1) {
          err.model = modelName;
          throw err;
        }
        await sleep(1500 * (attempt + 1));
      }
    }
  }
  throw lastError || new Error("All models failed");
};

/**
 * POST /ai/analyze-dream
 * Analyze a dream using Gemini AI and provide interpretation
 */
router.post("/analyze-dream", authenticate, async (req, res) => {
  try {
    const { dream } = req.body;

    if (!dream || dream.trim().length === 0) {
      return res.status(400).json({
        message: "Validation error",
        error: "Dream text is required"
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        message: "AI service unavailable",
        error: "GEMINI_API_KEY is not configured on the server"
      });
    }

    const prompt = `
    Analyze the following dream and provide a structured interpretation.
    Dream: "${dream}"

    Provide the whole response in two parts, one should be a short summary and the other should be detailed meaning and analysis in good formatted text in 100 words.
    `;

    const text = await generateWithFallback(prompt);

    res.json({ 
      message: "Dream analysis completed successfully",
      analysis: text 
    });
  } catch (error) {
    console.error("🔥 AI Analysis Error:", error);
    res.status(500).json({ 
      message: "Error analyzing dream",
      error: error.message 
    });
  }
});

module.exports = router;
