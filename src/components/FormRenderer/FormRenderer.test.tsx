import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import FormRenderer from "./FormRenderer";
import type { FormSchema } from "@/types";
import '@testing-library/jest-dom';

const mockSchema: FormSchema = {
  title: "Test Form",
  fields: [
    { label: "Name", type: "text", name: "name", required: true },
    { label: "Age", type: "number", name: "age", required: true },
    {
      label: "Gender",
      type: "select",
      name: "gender",
      required: true,
      options: ["Male", "Female", "Other"],
    },
  ],
};

describe("FormRenderer", () => {
  it("renders the form title", () => {
    render(
      <RecoilRoot>
        <FormRenderer schema={mockSchema} />
      </RecoilRoot>
    );
    expect(screen.getByText("Test Form")).toBeInTheDocument();
  });

  it("renders all fields from schema", () => {
    render(
      <RecoilRoot>
        <FormRenderer schema={mockSchema} />
      </RecoilRoot>
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty required fields", () => {
    render(
      <RecoilRoot>
        <FormRenderer schema={mockSchema} />
      </RecoilRoot>
    );
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Age is required")).toBeInTheDocument();
    expect(screen.getByText("Gender is required")).toBeInTheDocument();
  });

  it("submits form when all required fields are filled", () => {
    render(
      <RecoilRoot>
        <FormRenderer schema={mockSchema} />
      </RecoilRoot>
    );
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Age"), { target: { value: "25" } });
    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: "Male" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    // No error messages should be present
    expect(screen.queryByText(/is required/)).not.toBeInTheDocument();
  });

  it("resets form values and errors when Reset is clicked", () => {
    render(
      <RecoilRoot>
        <FormRenderer schema={mockSchema} />
      </RecoilRoot>
    );
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Age"), { target: { value: "25" } });
    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: "Male" },
    });
    fireEvent.click(screen.getByRole("button", { name: /reset/i }));
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Age")).toHaveValue(null);
  });
});
