import { renderHook, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useFormState } from "./useFormState";
import type { FormSchema } from "@/types";

const mockSchema: FormSchema = {
  title: "Test Form",
  fields: [
    { label: "Name", type: "text", name: "name", required: true },
    { label: "Age", type: "number", name: "age", required: true },
  ],
};

describe("useFormState", () => {
  it("should initialize with empty values and errors", () => {
    const { result } = renderHook(() => useFormState(mockSchema), {
      wrapper: RecoilRoot,
    });
    expect(result.current.values).toEqual({});
    expect(result.current.errors).toEqual({});
  });

  it("should update value and clear error on handleChange", () => {
    const { result } = renderHook(() => useFormState(mockSchema), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.handleChange("name", "John");
    });

    expect(result.current.values).toEqual({ name: "John" });
    expect(result.current.errors).toEqual({ name: "" });
  });

  it("should validate and set errors on handleSubmit", () => {
    const { result } = renderHook(() => useFormState(mockSchema), {
      wrapper: RecoilRoot,
    });

    let errors: Record<string, string> = {};
    act(() => {
      errors = result.current.handleSubmit();
    });

    expect(errors).toHaveProperty("name");
    expect(errors).toHaveProperty("age");
    expect(errors.name).toBe("Name is required");
    expect(errors.age).toBe("Age is required");
  });

  it("should reset values and errors", () => {
    const { result } = renderHook(() => useFormState(mockSchema), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.handleChange("name", "John");
      result.current.handleChange("age", 30);
      result.current.reset();
    });

    expect(result.current.values).toEqual({});
    expect(result.current.errors).toEqual({});
  });
});