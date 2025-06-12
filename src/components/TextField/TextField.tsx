import type { FormField } from "@/types";

type Props = {
  field: FormField;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
};
// This component is used to render a text input field with a label and error message if applicable.
const TextField = ({ field, value, error, onChange }: Props) => (
  <div className="mb-4">
    <label className="block font-medium text-start mb-1 text-blue-800 " htmlFor={field.name}>
      {field.label}
    </label>
    <input
      type="text"
      name={field.name}
      value={value}
      onChange={(e) => onChange(field.name, e.target.value)}
      className="border border-blue-600 rounded w-full px-3 py-2 text-black"
      required={field.required}
      id={field.name}
    />
    {error && <p className="text-red-500 text-sm text-start mt-1">{error}</p>}
  </div>
);

export default TextField;
