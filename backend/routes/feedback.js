// routes/feedback.js
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// ===== Feedback Schema =====
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// ===== Helper function to validate email =====
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ===== POST /api/feedback =====
// 👇 Public route – anyone can submit feedback
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate fields
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  // Validate email
  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email address!" });
  }

  try {
    // Save feedback
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();

    return res.status(201).json({
      success: true,
      message: "🎉 Thank you! Your feedback has been submitted successfully.",
    });
  } catch (err) {
    console.error("Error saving feedback:", err);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

export default router;
