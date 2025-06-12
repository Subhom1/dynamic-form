import { useRecoilState } from "recoil";
import type { FormSchema } from "@/types";
import { validateForm } from "@/utils/validation";
import { formValuesAtom, formErrorsAtom } from "@/recoil/atoms";
// This hook manages the form state using Recoil.
// It provides a way to get the current form values and a function to update them.
// The `useFormState` hook takes a schema as an argument, which can be used for validation or other purposes.
export const useFormState = (schema: FormSchema) => {
  const [values, setValues] = useRecoilState(formValuesAtom);
  const [errors, setErrors] = useRecoilState(formErrorsAtom);
// This function handles changes to the form fields.
// It updates the values state and clears any existing error for the field being changed.
  const handleChange = (name: string, value: unknown) => {
    setValues((prev: Record<string, unknown>) => ({ ...prev, [name]: value }));
    setErrors((prev: Record<string, string>) => ({ ...prev, [name]: "" }));
  };
  // This function handles the form submission.
// It validates the form using the provided schema and updates the errors state.
  const handleSubmit = () => {
    const validation = validateForm(
      schema,
      values as Record<string, string | number | boolean | string[] | number[] | boolean[]>
    );
    setErrors(validation);
    return validation;
  };
  // This function resets the form values and errors to their initial state.
  const reset = () => {
    setValues({});
    setErrors({});
  };

  return { values, handleChange, reset, errors, handleSubmit };
};
