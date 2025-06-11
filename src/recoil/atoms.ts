import { atom } from "recoil";

// This atom is used to store the form values and errors in a Recoil state.
// The `formValuesAtom` holds the current values of the form fields,
// while the `formErrorsAtom` holds any validation errors associated with those fields.
// This allows for easy management and access to the form state throughout the application.

export const formValuesAtom = atom<Record<string, unknown>>({
  key: "formValues",
  default: {},
});

export const formErrorsAtom = atom<Record<string, string>>({
  key: "formErrors",
  default: {},
});

