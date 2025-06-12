import type { FormSchema } from "@/types";
import { useFormState } from "@/hooks/useFormState";
import FieldRenderer from "@/components/FieldRenderer";
import { useSetRecoilState } from "recoil";
import { formSubmittedValuesAtom } from "@/recoil/atoms";

type Props = {
  schema: FormSchema;
};
// This component is used to render a form based on the provided schema.
const FormRenderer: React.FC<Props> = ({ schema }) => {
  const { values, handleChange, reset, errors, handleSubmit } =
    useFormState(schema);
  const setFormSubmittedValue = useSetRecoilState(formSubmittedValuesAtom);
  // This function handles the form submission.
  // It prevents the default form submission behavior, validates the form, and updates the submitted values state if there are no validation errors.
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = handleSubmit();
    if (Object.keys(validationErrors).length === 0) {
      setFormSubmittedValue(values);
    } else {
      console.error("Form validation errors:", validationErrors);
    }
  };
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-blue-800 text-start">
        {schema.title}
      </h1>
      <form onSubmit={handleFormSubmit}>
        {schema.fields.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            value={
              values[field.name] as
                | string
                | number
                | boolean
                | string[]
                | number[]
                | boolean[]
            }
            onChange={handleChange}
            error={errors[field.name]}
          />
        ))}
        <div className="flex justify-between">
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700  cursor-pointer w-full"
          >
            Submit
          </button>

          <button
            type="button"
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer w-full ml-5"
            onClick={() => {
              setFormSubmittedValue({});
              reset();
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormRenderer;
