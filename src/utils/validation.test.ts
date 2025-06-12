import { validateForm } from "./validation";
import type { FormSchema } from "@/types";

const schema: FormSchema = {
  title: "Test Form",
  fields: [
    { label: "Name", type: "text", name: "name", required: true },
    { label: "Age", type: "number", name: "age", required: true },
    { label: "Bio", type: "text", name: "bio", required: false },
  ],
};

describe("validateForm", () => {
  it("returns errors for missing required fields", () => {
    const values = {};
    const errors = validateForm(schema, values);
    expect(errors).toEqual({
      name: "Name is required",
      age: "Age is required",
    });
  });

  it("returns error for text field with numbers or special characters", () => {
    const values = { name: "John123", age: 25 };
    const errors = validateForm(schema, values);
    expect(errors.name).toBe("Name cannot include numbers or special characters");
  });

  it("returns error for number field with non-numeric value", () => {
    const values = { name: "John", age: "abc" };
    const errors = validateForm(schema, values);
    expect(errors.age).toBe("Age must be a number");
  });

  it("does not return error for valid values", () => {
    const values = { name: "John", age: 30, bio: "Hello world" };
    const errors = validateForm(schema, values);
    expect(errors).toEqual({});
  });

  it("returns error for required field that is an empty string", () => {
    const values = { name: "", age: "" };
    const errors = validateForm(schema, values);
    expect(errors.name).toBe("Name is required");
    expect(errors.age).toBe("Age is required");
  });

  it("returns error for required field that is an empty array", () => {
    const customSchema: FormSchema = {
      title: "Test",
      fields: [
        { label: "Hobbies", type: "text", name: "hobbies", required: true },
      ],
    };
    const values = { hobbies: [] };
    const errors = validateForm(customSchema, values);
    expect(errors.hobbies).toBe("Hobbies is required");
  });
});