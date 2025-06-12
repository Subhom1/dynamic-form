
import type { FormField } from "@/types";

type Props = {
  field: FormField;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
};

const TextareaField = ({ field, value, error, onChange }: Props) => (
  <div className="mb-4">
    <label
      className="block font-medium mb-1 text-start text-blue-800"
      htmlFor={field.name}
    >
      {field.label}
    </label>
    <textarea
      id={field.name}
      name={field.name}
      value={value ?? ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      className="w-full p-2 border border-blue-600 rounded text-black"
      rows={4}
      required={field.required}
    />
    {error && <p className="text-red-500 text-sm mt-1 text-start">{error}</p>}
  </div>
);

export default TextareaField;
