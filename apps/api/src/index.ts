import express from "express";
import cors from "cors";
import intakeRouter from "./routes/intake.js";
import { errorHandler } from "./middleware/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/intake", intakeRouter);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "CareFlow-Behavioral-API",
    version: "1.0.0"
  });
});

// Global error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 CareFlow Clinical API running at http://localhost:${PORT}`);
});