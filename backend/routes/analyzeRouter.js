const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze-dream", async (req, res) => {
  const { dream } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
   const prompt = `
    Analyze the following dream and provide a structured interpretation.
    Dream: "${dream}"

    Provide the whole response in two parts, one should be a short summary and the other should be detailed meaning and analysis in good formatted text in 100 words.
    `;

    const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = response.response.candidates[0]?.content?.parts[0]?.text || "No response received.";

    res.json({ analysis: text });
    } catch (error) {
    console.error("🔥 AI Analysis Error:", error);
    res.status(500).json({ error: "Error analyzing dream.", details: error.message });
    }
});


module.exports = router;
