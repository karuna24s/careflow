import { describe, it, expect } from "vitest";
import { PatientIntakeSchema } from "./intake";

describe("PatientIntakeSchema", () => {
  const validIntake = {
    childName: "Emma Smith",
    serviceType: "Childcare Support",
    childAge: 5,
  };

  it("accepts valid intake data", () => {
    const result = PatientIntakeSchema.safeParse(validIntake);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.childName).toBe("Emma Smith");
      expect(result.data.serviceType).toBe("Childcare Support");
      expect(result.data.childAge).toBe(5);
    }
  });

  it("trims and validates childName (min 2 chars)", () => {
    expect(PatientIntakeSchema.safeParse({ ...validIntake, childName: "A" }).success).toBe(false);
    expect(PatientIntakeSchema.safeParse({ ...validIntake, childName: "  " }).success).toBe(false);
    const trimmed = PatientIntakeSchema.safeParse({ ...validIntake, childName: "  Jo  " });
    expect(trimmed.success).toBe(true);
    if (trimmed.success) expect(trimmed.data.childName).toBe("Jo");
  });

  it("rejects empty serviceType", () => {
    const result = PatientIntakeSchema.safeParse({ ...validIntake, serviceType: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("childcare service");
    }
  });

  it("coerces childAge from string to number", () => {
    const result = PatientIntakeSchema.safeParse({ ...validIntake, childAge: "7" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.childAge).toBe(7);
  });

  it("rejects childAge below 0", () => {
    const result = PatientIntakeSchema.safeParse({ ...validIntake, childAge: -1 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("negative");
    }
  });

  it("rejects childAge above 18", () => {
    const result = PatientIntakeSchema.safeParse({ ...validIntake, childAge: 19 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("18");
    }
  });

  it("rejects missing required fields", () => {
    expect(PatientIntakeSchema.safeParse({})).toMatchObject({ success: false });
    expect(PatientIntakeSchema.safeParse({ childName: "Test" })).toMatchObject({ success: false });
  });
});
