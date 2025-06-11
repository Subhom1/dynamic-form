import type { FormField } from "@/types/index";

type Props = {
  field: FormField;
  value: boolean;
  error?: string;
  onChange: (name: string, value: boolean) => void;
};
// This component is used to render a checkbox input field with a label.
const CheckboxField = ({ field, value, onChange }: Props) => (
  <div className="mb-4 flex items-center gap-2">
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => onChange(field.name, e.target.checked)}
    />
    <label className="font-medium text-blue-800 text-left mb-1">
      {field.label}
    </label>
  </div>
);

export default CheckboxField;
