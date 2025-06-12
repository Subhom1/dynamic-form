import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import TextField from "./TextField";
import type { FormField } from "@/types";

const mockField: FormField = {
  label: "Name",
  type: "text",
  name: "name",
  required: true,
};

describe("TextField", () => {
  it("renders label and input", () => {
    render(
      <TextField field={mockField} value="" onChange={jest.fn()} />
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows error message when error prop is provided", () => {
    render(
      <TextField
        field={mockField}
        value=""
        error="Name is required"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("calls onChange with correct arguments when input changes", () => {
    const handleChange = jest.fn();
    render(
      <TextField
        field={mockField}
        value=""
        onChange={handleChange}
      />
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "John" } });
    expect(handleChange).toHaveBeenCalledWith("name", "John");
  });

  it("sets required attribute when field.required is true", () => {
    render(
      <TextField
        field={mockField}
        value=""
        onChange={jest.fn()}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  it("does not set required attribute when field.required is false", () => {
    const optionalField = { ...mockField, required: false };
    render(
      <TextField
        field={optionalField}
        value=""
        onChange={jest.fn()}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).not.toBeRequired();
  });
})