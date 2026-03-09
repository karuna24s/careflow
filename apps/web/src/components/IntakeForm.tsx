import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientIntakeSchema, type PatientIntake } from "@careflow/shared";

export const IntakeForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PatientIntake>({
    resolver: zodResolver(PatientIntakeSchema),
  });

  const onSubmit = (data: PatientIntake) => {
    console.log("Form is valid! Sending to API:", data);
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-slate-800">Clinical Intake</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Step 1: Select Childcare */}
        <div>
          <label className="block text-sm font-medium">Service Type</label>
          <select {...register("serviceType")} className="w-full border p-2 rounded">
            <option value="">Select a service...</option>
            <option value="Childcare Support">Childcare Support</option>
            <option value="Early Intervention">Early Intervention</option>
          </select>
          {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
        </div>

        {/* Step 2: Leave Age Empty to test "Shared Logic" */}
        <div>
          <label className="block text-sm font-medium">Child's Age</label>
          <input
            type="number"
            {...register("childAge")}
            className={`w-full border p-2 rounded ${errors.childAge ? 'border-red-500' : 'border-slate-300'}`}
          />
          {errors.childAge && <p className="text-red-500 text-xs mt-1">{errors.childAge.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">
          Submit Intake
        </button>
      </form>
    </div>
  );
};