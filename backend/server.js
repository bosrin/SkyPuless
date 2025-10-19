// ✅ Import dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import feedbackRoutes from "./routes/feedback.js";
import detect from "detect-port"; // <-- auto port detect

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",        // Local frontend
      "https://skypules.netlify.app"  // Production frontend
    ],
    credentials: true,
  })
);

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

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 SkyPulses Backend API is running successfully!");
});

// ✅ Server start (auto-detect port if busy)
const DEFAULT_PORT = process.env.PORT || 5000;

detect(DEFAULT_PORT).then((port) => {
  if (port === Number(DEFAULT_PORT)) {
    app.listen(port, "0.0.0.0", () =>
      console.log(`🚀 Server running on port ${port}`)
    );
  } else {
    console.log(`⚠️ Port ${DEFAULT_PORT} is in use, switching to ${port}`);
    app.listen(port, "0.0.0.0", () =>
      console.log(`🚀 Server running on port ${port}`)
    );
  }
});
