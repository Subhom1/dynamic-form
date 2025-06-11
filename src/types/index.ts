
export type FieldType =
  | "text"
  | "number"
  | "checkbox"
  | "select"
  | "date"
  | "textarea";

export interface BaseField {
  label: string;
  name: string;
  type: FieldType;
  required?: boolean;
}

export interface SelectField extends BaseField {
  type: "select";
  options: string[];
}

export type FormField = BaseField | SelectField;

export interface FormSchema {
  title: string;
  fields: FormField[];
}
