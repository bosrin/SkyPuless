import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import feedbackRoutes from "./routes/feedback.js";

// Load environment variables
dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend.vercel.app"], // <-- change this to your frontend URL
  credentials: true,
}));
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// ✅ Routes
app.use("/api/feedback", feedbackRoutes);

// ✅ Health check route (for Render/Vercel uptime)
app.get("/", (req, res) => {
  res.send("🚀 Backend API is running successfully!");
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
