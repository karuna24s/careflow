import { z } from "zod";

export const PatientIntakeSchema = z.object({
  // Rule: Must select a service
  serviceType: z.string().min(1, "Please select a childcare service"),

  // Rule: Age is mandatory and must be a number
  childAge: z.coerce
    .number({
      error: "Child's age is required for behavioral matching"
    })
    .min(0, "Age cannot be negative")
    .max(18, "Child must be 18 or younger"),
});

export type PatientIntake = z.infer<typeof PatientIntakeSchema>;