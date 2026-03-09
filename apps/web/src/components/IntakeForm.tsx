import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientIntakeSchema, type PatientIntake } from "@careflow/shared";

export const IntakeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientIntake>({
    resolver: zodResolver(PatientIntakeSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: PatientIntake) => {
    try {
      const response = await fetch("http://localhost:3001/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Server error");
      alert(`Success! Intake submitted for ${data.childName}`);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to connect to the CareFlow API.");
    }
  };

  const inputClass = (name: keyof PatientIntake) => `
    mt-1 block w-full rounded-md border p-2 transition-all
    ${errors[name] ? "border-red-500 bg-red-50" : "border-slate-300 focus:ring-2 focus:ring-blue-500"}
  `;

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Child Name Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Child's Name</label>
          <input {...register("childName")} className={inputClass("childName")} />
          {errors.childName && <p className="text-red-500 text-xs mt-1">{errors.childName.message}</p>}
        </div>

        {/* Service Type Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Service Category</label>
          <select {...register("serviceType")} className={inputClass("serviceType")}>
            <option value="">Select a service...</option>
            <option value="Childcare Support">Childcare Support</option>
            <option value="Early Intervention">Early Intervention</option>
            <option value="Behavioral Therapy">Behavioral Therapy</option>
          </select>
          {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
        </div>

        {/* Child Age Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Child's Age</label>
          <input type="number" {...register("childAge")} className={inputClass("childAge")} />
          {errors.childAge && <p className="text-red-500 text-xs mt-1">{errors.childAge.message}</p>}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 disabled:bg-slate-400 transition-colors"
        >
          {isSubmitting ? "Processing..." : "Submit Clinical Intake"}
        </button>
      </form>

      {/* Shared Logic Instruction */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-100">
        <h3 className="text-blue-800 font-bold text-sm uppercase">Shared Logic</h3>
        <p className="text-blue-700 text-sm">
          Select <strong>Childcare Support</strong> and leave <strong>Child Age</strong> empty.
          The error message is defined once in <code>packages/shared</code>.
        </p>
      </div>
    </div>
  );
};