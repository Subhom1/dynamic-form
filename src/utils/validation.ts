// utils/validation.ts
import type { FormSchema } from "@/types";
// This utility function validates a form based on the provided schema and values.
// It checks for required fields, type-specific validations, and returns an object with error messages.
export function validateForm(
  schema: FormSchema,
  values: Record<
    string,
    string | number | boolean | string[] | number[] | boolean[]
  >
): Record<string, string> {
  const errors: Record<string, string> = {};
// Validate each field based on the schema
  for (const field of schema.fields) {
    const value = values[field.name];
// Check if the field exists in the values
    if (field.required) {
      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);
// If the field is required and empty, add an error
      if (isEmpty) {
        errors[field.name] = `${field.label} is required`;
        continue;
      }
    }
    // Additional type-specific validation
    if (field.type === "text" && typeof value === "string") {
      if (/^\d+$/.test(value)) {
        errors[field.name] = `${field.label} cannot include numbers`;
      }
    }
    if (
      field.type === "number" &&
      value !== undefined &&
      isNaN(Number(value))
    ) {
      errors[field.name] = `${field.label} must be a number`;
    }
  }

  return errors;
}
