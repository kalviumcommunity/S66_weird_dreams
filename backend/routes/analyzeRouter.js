const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { authenticate } = require("../middleware/authenticate");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

const getModel = () => {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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

    const model = getModel();
    if (!model) {
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

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = response.response.candidates[0]?.content?.parts[0]?.text || "No response received.";

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
