import express from "express";
import cors from "cors";
// Note: In ESM mode, TypeScript requires the .js extension for local imports
import intakeRouter from "./routes/intake.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allows the Vite frontend (usually :5173) to communicate
app.use(express.json()); // Parses incoming JSON payloads

// Register Routes
app.use("/api/intake", intakeRouter);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "CareFlow-Behavioral-API",
    version: "1.0.0"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CareFlow Clinical API running at http://localhost:${PORT}`);
});