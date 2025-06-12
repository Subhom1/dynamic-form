import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import NumberField from "./NumberField";
import type { FormField } from "@/types";

const mockField: FormField = {
  label: "Age",
  type: "number",
  name: "age",
  required: true,
};

describe("NumberField", () => {
  it("renders label and input", () => {
    render(<NumberField field={mockField} value={0} onChange={jest.fn()} />);
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("shows error message when error prop is provided", () => {
    render(
      <NumberField
        field={mockField}
        value={0}
        error="Age is required"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Age is required")).toBeInTheDocument();
  });

  it("calls onChange with correct arguments when input changes", () => {
    const handleChange = jest.fn();
    render(
      <NumberField
        field={mockField}
        value={0}
        onChange={handleChange}
      />
    );
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "25" } });
    expect(handleChange).toHaveBeenCalledWith("age", 25);
  });

  it("sets required attribute when field.required is true", () => {
    render(
      <NumberField
        field={mockField}
        value={0}
        onChange={jest.fn()}
      />
    );
    const input = screen.getByRole("spinbutton");
    expect(input).toBeRequired();
  });

  it("does not set required attribute when field.required is false", () => {
    const optionalField = { ...mockField, required: false };
    render(
      <NumberField
        field={optionalField}
        value={0}
        onChange={jest.fn()}
      />
    );
    const input = screen.getByRole("spinbutton");
    expect(input).not.toBeRequired();
  });

  it("renders with correct min and max attributes", () => {
    render(
      <NumberField
        field={mockField}
        value={0}
        onChange={jest.fn()}
      />
    );
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("min", "1");
    expect(input).toHaveAttribute("max", "120");
  });

  it("renders with the correct value", () => {
    render(
      <NumberField
        field={mockField}
        value={42}
        onChange={jest.fn()}
      />
    );
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(42);
  });

  it("renders with empty value when value is 0", () => {
    render(
      <NumberField
        field={mockField}
        value={0}
        onChange={jest.fn()}
      />
    );
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(null);
  });

  it("does not crash if error is not provided", () => {
    render(
      <NumberField
        field={mockField}
        value={30}
        onChange={jest.fn()}
      />
    );
    expect(screen.queryByText(/is required/)).not.toBeInTheDocument();
  });
});