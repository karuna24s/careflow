import { Router, Request, Response } from "express";
import { PatientIntakeSchema } from "@careflow/shared";

const router = Router();

// This handles POST requests to http://localhost:3001/api/intake
router.post("/", async (req: Request, res: Response) => {
  try {
    // 1. Validate the incoming body against the Shared Zod Schema
    const validatedData = PatientIntakeSchema.parse(req.body);

    // 2. Business Logic
    console.log(`✅ Intake Success: Child ${validatedData.childName} for ${validatedData.serviceType}`);

    // 3. Successful response
    return res.status(201).json({
      success: true,
      message: "Childcare behavioral intake received.",
      data: {
        id: `intk_${Math.random().toString(36).substring(2, 11)}`,
        childName: validatedData.childName,
        receivedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      console.error("❌ Validation Failed:", error.errors);
      return res.status(400).json({
        success: false,
        message: "Data validation failed.",
        errors: error.errors
      });
    }

    console.error("🔥 System Error:", error);
    return res.status(500).json({
      success: false,
      message: "An internal clinical server error occurred."
    });
  }
});

export default router;