import type { FormField } from "@/types";

type Props = {
  field: FormField;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
};

const RadioField = ({ field, value, error, onChange }: Props) => (
  <div className="mb-4">
    <span className="block font-medium mb-1 text-blue-800 text-start">
      {field.label}
    </span>
    <div className="flex w-full flex-wrap">
      {"options" in field &&
        field.options.map((option: string) => {
          const inputId = `${field.name}-${option}`;
          return (
            <label
              key={option}
              className="items-center mr-4 text-blue-800"
              htmlFor={inputId}
            >
              <input
                type="radio"
                name={field.name}
                value={option}
                checked={value === option}
                onChange={() => onChange(field.name, option)}
                className="mr-2 cursor-pointer"
                id={inputId}
                required={field.required}
              />
              {option}
            </label>
          );
        })}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default RadioField;
