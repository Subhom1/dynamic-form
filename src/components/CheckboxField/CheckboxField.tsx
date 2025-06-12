import type { FormField } from "@/types";

type Props = {
  field: FormField;
  value: boolean;
  error?: string;
  onChange: (name: string, value: boolean) => void;
};
// This component is used to render a checkbox input field with a label.
const CheckboxField = ({ field, value, onChange,error }: Props) => (
  <div className="mb-4">
    <div className="flex items-center gap-2 ">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(field.name, e.target.checked)}
        className="cursor-pointer"
        id={field.name}
        required={field.required}
      />
      <label className="font-medium text-blue-800 text-left mb-1" htmlFor={field.name}>
        {field.label}
      </label>
    </div>
    {error && <p className="text-red-500 text-sm text-start">{error}</p>}
  </div>
);

export default CheckboxField;
