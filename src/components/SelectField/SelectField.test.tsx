import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectField from "./SelectField";
import type { FormField } from "@/types";

const mockField: FormField = {
  label: "Gender",
  type: "select",
  name: "gender",
  required: true,
  options: ["Male", "Female", "Others"],
};

describe("SelectField", () => {
  it("renders label and select", () => {
    render(<SelectField field={mockField} value="" onChange={jest.fn()} />);
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders all options including placeholder", () => {
    render(<SelectField field={mockField} value="" onChange={jest.fn()} />);
    expect(screen.getByText("Select...")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("Others")).toBeInTheDocument();
  });

  it("shows error message when error prop is provided", () => {
    render(
      <SelectField
        field={mockField}
        value=""
        error="Gender is required"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Gender is required")).toBeInTheDocument();
  });

  it("calls onChange with correct arguments when selection changes", () => {
    const handleChange = jest.fn();
    render(<SelectField field={mockField} value="" onChange={handleChange} />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Female" } });
    expect(handleChange).toHaveBeenCalledWith("gender", "Female");
  });

  it("sets required attribute when field.required is true", () => {
    render(<SelectField field={mockField} value="" onChange={jest.fn()} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeRequired();
  });

  it("does not set required attribute when field.required is false", () => {
    const optionalField = { ...mockField, required: false };
    render(<SelectField field={optionalField} value="" onChange={jest.fn()} />);
    const select = screen.getByRole("combobox");
    expect(select).not.toBeRequired();
  });
});
