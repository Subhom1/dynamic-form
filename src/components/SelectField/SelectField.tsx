import type { FormField} from "@/types";

type Props = {
  field: FormField;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
};
// This component is used to render a select input field with a label and error message if applicable.
const SelectField = ({ field, value, error, onChange }: Props) => (
  <div className="mb-4">
    <label className="block font-medium text-start mb-1 text-blue-800" htmlFor={field.name}>
      {field.label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(field.name, e.target.value)}
      className="border border-blue-600 rounded w-full px-3 py-2 text-black"
      id={field.name}
      required={field.required}
    >
      <option value="">Select...</option>
      {"options" in field &&
        field.options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1 text-start">{error}</p>}
  </div>
);

export default SelectField;
