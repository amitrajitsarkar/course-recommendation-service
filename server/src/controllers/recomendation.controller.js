import courseModel from "../models/Course.js";
import userModel from "../models/User.js";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

class RecommendationController {
  async recommend(req, res) {
    try {
      const student = await userModel
        .findById(req.user.userId)
        .select("username interests goal");

      if (!student) {
        return res
          .status(404)
          .json({ success: false, msg: "No student found" });
      }

      const courses = await courseModel
        .find()
        .select("mentor title description");

      const prompt = `
    You are a course recommendation assistant.

    Student Details:
    - Interests: ${student.interests.join(", ") || "none"}
    - Goal: ${student.goal || "none"}

    Available Courses:
    ${JSON.stringify(courses, null, 2)}

Recommend only the best 1 or 2 courses.
Return ONLY a valid JSON array.

Example:

[
  {
    "title": "...",
    "mentor": "...",
    "description": "..."
  }
]

Do not include headings, markdown, explanations, or any other text.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const cleanText = response.text.replace(/```json|```/g, "").trim();
      const recommendations = JSON.parse(cleanText);

      return res.status(200).json({
        success: true,
        for: student.username,
        count : recommendations.length,
        recommendations,
      });
    } catch (error) {
      console.error("Recommendation error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new RecommendationController();
