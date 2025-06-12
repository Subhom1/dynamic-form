import type { FormField } from "@/types";
import TextField from "@/components/TextField";
import TextareaField from "@/components/TextareaField";
import NumberField from "@/components/NumberField";
import CheckboxField from "@/components/CheckboxField";
import SelectFieldComponent from "@/components/SelectField";
import DateField from "@/components/DateField";

type Props = {
  field: FormField;
  value: string | number | boolean | string[] | number[] | boolean[];
  error?: string;
  onChange: (name: string, value: unknown) => void;
};
// This component is used to render a field based on its type.
const FieldRenderer = ({ field, value, error, onChange }: Props) => {
  switch (field.type) {
    case "text":
      return (
        <TextField
          field={field}
          value={String(value ?? "")}
          error={error}
          onChange={onChange}
        />
      );
    case "number":
      return (
        <NumberField
          field={field}
          value={typeof value === "number" ? value : Number(value ?? 0)}
          error={error}
          onChange={onChange}
        />
      );
    case "select":
      return (
        <SelectFieldComponent
          field={field}
          value={String(value ?? "")}
          error={error}
          onChange={onChange}
        />
      );
    case "checkbox":
      return (
        <CheckboxField
          field={field}
          value={Boolean(value)}
          error={error}
          onChange={onChange}
        />
      );
    case "textarea":
      return (
        <TextareaField
          field={field}
          value={String(value ?? "")}
          error={error}
          onChange={onChange}
        />
      );
      case "date":
      return (
        <DateField
          field={field}
          value={String(value ?? "")}
          error={error}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};

export default FieldRenderer;
