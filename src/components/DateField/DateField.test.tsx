import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateField from "./DateField";
import type { FormField } from "@/types";

const mockField: FormField = {
  label: "Date of Birth",
  type: "date",
  name: "dob",
  required: true,
};

describe("DateField", () => {
  it("renders label and date input", () => {
    render(<DateField field={mockField} value="" onChange={jest.fn()} />);
    expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth")).toHaveAttribute(
      "type",
      "date"
    );
  });

  it("shows error message when error prop is provided", () => {
    render(
      <DateField
        field={mockField}
        value=""
        error="Date of Birth is required"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Date of Birth is required")).toBeInTheDocument();
  });

  it("calls onChange with correct arguments when input changes", () => {
    const handleChange = jest.fn();
    render(<DateField field={mockField} value="" onChange={handleChange} />);
    const input = screen.getByLabelText("Date of Birth");
    fireEvent.change(input, { target: { value: "2000-01-01" } });
    expect(handleChange).toHaveBeenCalledWith("dob", "2000-01-01");
  });

  it("sets required attribute when field.required is true", () => {
    render(<DateField field={mockField} value="" onChange={jest.fn()} />);
    const input = screen.getByLabelText("Date of Birth");
    expect(input).toBeRequired();
  });

  it("does not set required attribute when field.required is false", () => {
    const optionalField = { ...mockField, required: false };
    render(<DateField field={optionalField} value="" onChange={jest.fn()} />);
    const input = screen.getByLabelText("Date of Birth");
    expect(input).not.toBeRequired();
  });
});
