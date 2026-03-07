import { z } from 'zod';

export const PatientIntakeSchema = z.object({
  // Demographics
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  zipCode: z.string().length(5, "Must be 5 digits"), // BridgeCare: Location matching

  // Clinical/Care Needs
  careType: z.enum(['behavioral_health', 'childcare', 'other']),
  reasonForVisit: z.string().min(10, "Please provide more detail"),

  // Reliability: Status field for partial saves
  status: z.enum(['draft', 'submitted']).default('draft'),

  // Complexity: Eligibility Check (BridgeCare Vibe)
  householdSize: z.number().int().min(1).optional(),
});

export type PatientIntake = z.infer<typeof PatientIntakeSchema>;