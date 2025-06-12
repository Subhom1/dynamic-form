import type { FormField } from "@/types";

type Props = {
  field: FormField;
  value: number;
  error?: string;
  onChange: (name: string, value: number) => void;
};
// This component is used to render a number input field with a label and error message if applicable.
const NumberField = ({ field, value, error, onChange }: Props) => (
  <div className="mb-4">
    <label className="block font-medium text-blue-800 text-start mb-1" htmlFor={field.name}>
      {field.label}
    </label>
    <input
      type="number"
      value={value || ""}
      onChange={(e) => onChange(field.name, parseInt(e.target.value))}
      className="border border-blue-600 rounded w-full px-3 py-2 text-black"
      required={field.required}
      id={field.name}
      min={1}
      max={120}
    />
    {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
  </div>
);

export default NumberField;
