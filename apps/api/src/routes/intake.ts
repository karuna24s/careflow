import { Router } from "express";
import { PatientIntakeSchema } from "@careflow/shared";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const data = PatientIntakeSchema.parse(req.body);

    console.log(`✅ Clinical intake received for: ${data.childName}`);

    return res.status(201).json({
      success: true,
      message: "Childcare intake received successfully.",
      data: {
        id: `INTK-${Math.floor(Math.random() * 10000)}`,
        childName: data.childName,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;