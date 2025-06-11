import type { FormSchema } from "@/types/index";
import { useFormState } from "@/hooks/useFormState";
import FieldRenderer from "@/components/FieldRenderer";
import { useSetRecoilState } from "recoil";
import { formSubmittedValuesAtom } from "@/recoil/atoms";

type Props = {
  schema: FormSchema;
};
// This component is used to render a form based on the provided schema.
const FormRenderer: React.FC<Props> = ({ schema }) => {
  const { values, handleChange , reset } = useFormState();
  const setFormSubmittedValue = useSetRecoilState(
    formSubmittedValuesAtom
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-800 text-start">
        {schema.title}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFormSubmittedValue(values);
        }}
        noValidate
      >
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
            onClick={() => { setFormSubmittedValue({}); reset(); }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRenderer;
