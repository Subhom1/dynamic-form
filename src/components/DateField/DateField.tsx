import type { FormField } from "@/types";

type Props = {
  field: FormField;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
};
// This component is used to render a date input field with a label and error message if applicable.
const DateField = ({ field, value, error, onChange }: Props) => (
  <div className="mb-4">
    <label className="block font-medium mb-1 text-blue-800 text-start" htmlFor={field.name}>
      {field.label}
    </label>
    <input
      type="date"
      id={field.name}
      name={field.name}
      value={value ?? ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      className="w-full p-2 border rounded border-blue-600 text-black"
      required={field.required}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default DateField;
