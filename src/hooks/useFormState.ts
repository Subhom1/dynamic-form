import { useRecoilState } from "recoil";
import { formValuesAtom } from "@/recoil/atoms";
// import type { FormSchema } from "@/types/index";

// This hook manages the form state using Recoil.
// It provides a way to get the current form values and a function to update them.
// The `useFormState` hook takes a schema as an argument, which can be used for validation or other purposes.
export const useFormState = () => {
  const [values, setValues] = useRecoilState(formValuesAtom);

  const handleChange = (name: string, value: unknown) => {
    setValues((prev: Record<string, unknown>) => ({ ...prev, [name]: value }));
  };
  const reset = () => {
    setValues({});
  };

  return { values, handleChange, reset };
};
