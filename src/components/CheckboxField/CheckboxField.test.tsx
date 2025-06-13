import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import CheckboxField from "./CheckboxField";
import type { FormField } from "@/types";

const mockField: FormField = {
  label: "Subscribe",
  type: "checkbox",
  name: "subscribe",
  required: true,
};

describe("CheckboxField", () => {
  it("renders label and checkbox input", () => {
    render(<CheckboxField field={mockField} value={false} onChange={jest.fn()} />);
    expect(screen.getByLabelText("Subscribe")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("shows error message when error prop is provided", () => {
    render(
      <CheckboxField
        field={mockField}
        value={false}
        error="Subscribe is required"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Subscribe is required")).toBeInTheDocument();
  });

  it("calls onChange with correct arguments when checkbox is checked", () => {
    const handleChange = jest.fn();
    render(
      <CheckboxField
        field={mockField}
        value={false}
        onChange={handleChange}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith("subscribe", true);
  });

  it("calls onChange with correct arguments when checkbox is unchecked", () => {
    const handleChange = jest.fn();
    render(
      <CheckboxField
        field={mockField}
        value={true}
        onChange={handleChange}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith("subscribe", false);
  });

  it("sets required attribute when field.required is true", () => {
    render(
      <CheckboxField
        field={mockField}
        value={false}
        onChange={jest.fn()}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeRequired();
  });

  it("does not set required attribute when field.required is false", () => {
    const optionalField = { ...mockField, required: false };
    render(
      <CheckboxField
        field={optionalField}
        value={false}
        onChange={jest.fn()}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeRequired();
  });

  it("checkbox is checked when value is true", () => {
    render(
      <CheckboxField
        field={mockField}
        value={true}
        onChange={jest.fn()}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("checkbox is not checked when value is false", () => {
    render(
      <CheckboxField
        field={mockField}
        value={false}
        onChange={jest.fn()}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("does not crash if error is not provided", () => {
    render(
      <CheckboxField
        field={mockField}
        value={false}
        onChange={jest.fn()}
      />
    );
    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
  });
});
