export type FieldType =
  | "text"
  | "number"
  | "checkbox"
  | "select"
  | "date"
  | "textarea";

interface TextField {
  label: string;
  name: string;
  type: "text";
  required?: boolean;
}

interface NumberField {
  label: string;
  name: string;
  type: "number";
  required?: boolean;
}

interface CheckboxField {
  label: string;
  name: string;
  type: "checkbox";
  required?: boolean;
}

interface DateField {
  label: string;
  name: string;
  type: "date";
  required?: boolean;
}

interface TextareaField {
  label: string;
  name: string;
  type: "textarea";
  required?: boolean;
}

 interface SelectField {
  label: string;
  name: string;
  type: "select";
  options: string[];
  required?: boolean;
}
interface RadioField {
  label: string;
  name: string;
  type: "radio";
  options: string[];
  required?: boolean;
}
export type FormField =
  | TextField
  | NumberField
  | CheckboxField
  | SelectField
  | DateField
  | TextareaField
  | RadioField;
export interface FormSchema {
  title: string;
  fields: FormField[];
}
