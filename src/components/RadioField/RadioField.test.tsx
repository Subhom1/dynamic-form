import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import RadioField from "./RadioField";
import type { FormField } from "@/types";

const mockField: FormField = {
  label: "Hobbies",
  type: "radio",
  name: "hobbies",
  required: true,
  options: ["Reading", "Traveling", "Cooking"],
};

describe("RadioField", () => {
  it("renders label and all radio options", () => {
    render(
      <RadioField field={mockField} value="" onChange={jest.fn()} />
    );
    expect(screen.getByText("Hobbies")).toBeInTheDocument();
    mockField.options.forEach(option => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  it("shows error message when error prop is provided", () => {
    render(
      <RadioField
        field={mockField}
        value=""
        error="Hobbies is required"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Hobbies is required")).toBeInTheDocument();
  });

  it("calls onChange with correct arguments when a radio option is selected", () => {
    const handleChange = jest.fn();
    render(
      <RadioField
        field={mockField}
        value=""
        onChange={handleChange}
      />
    );
    const radio = screen.getByLabelText("Traveling");
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledWith("hobbies", "Traveling");
  });

  it("checks the correct radio button when value matches", () => {
    render(
      <RadioField
        field={mockField}
        value="Cooking"
        onChange={jest.fn()}
      />
    );
    const radio = screen.getByLabelText("Cooking");
    expect(radio).toBeChecked();
  });

  it("sets required attribute when field.required is true", () => {
    render(
      <RadioField
        field={mockField}
        value=""
        onChange={jest.fn()}
      />
    );
    const radio = screen.getByLabelText("Reading");
    expect(radio).toBeRequired();
  });

  it("does not set required attribute when field.required is false", () => {
    const optionalField = { ...mockField, required: false };
    render(
      <RadioField
        field={optionalField}
        value=""
        onChange={jest.fn()}
      />
    );
    const radio = screen.getByLabelText("Reading");
    expect(radio).not.toBeRequired();
  });
});