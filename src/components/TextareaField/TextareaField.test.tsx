import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import TextareaField from "./TextareaField";
import type { FormField } from "@/types";

const mockField: FormField = {
  label: "Description",
  type: "textarea",
  name: "description",
  required: true,
};

describe("TextareaField", () => {
  it("renders label and textarea", () => {
    render(
      <TextareaField field={mockField} value="" onChange={jest.fn()} />
    );
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows error message when error prop is provided", () => {
    render(
      <TextareaField
        field={mockField}
        value=""
        error="Description is required"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Description is required")).toBeInTheDocument();
  });

  it("calls onChange with correct arguments when textarea changes", () => {
    const handleChange = jest.fn();
    render(
      <TextareaField
        field={mockField}
        value=""
        onChange={handleChange}
      />
    );
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Hello world" } });
    expect(handleChange).toHaveBeenCalledWith("description", "Hello world");
  });

  it("sets required attribute when field.required is true", () => {
    render(
      <TextareaField
        field={mockField}
        value=""
        onChange={jest.fn()}
      />
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeRequired();
  });

  it("does not set required attribute when field.required is false", () => {
    const optionalField = { ...mockField, required: false };
    render(
      <TextareaField
        field={optionalField}
        value=""
        onChange={jest.fn()}
      />
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).not.toBeRequired();
  });
});