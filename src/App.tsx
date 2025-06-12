import "./App.css";
import "./index.css";
import FormRenderer from "./components/FormRenderer";
import schemaDataRaw from "./mock/schema.json";
import type { FormSchema } from "@/types";
import { formSubmittedValuesAtom } from "./recoil/atoms";
import { useRecoilValue } from "recoil";
// Cast the imported JSON to FormSchema
const schemaData = schemaDataRaw as FormSchema;

function App() {
  const submittedData = useRecoilValue(formSubmittedValuesAtom);
  return (
    <>
      <h1 className=" text-3xl text-blue-950 font-semibold mb-10">
        Dynamic Form Field
      </h1>
      <div
        className="wrapper bg-white rounded-2xl border border-gray-200 shadow-lg p-8
      flex flex-col md:flex-row"
      >
        <div className="flex-1 flex flex-col items-center justify-center">
          <FormRenderer schema={schemaData} />
        </div>
        <div className="flex-1 flex items-center justify-center mt-10 md:mt-0">
            {Object.keys(submittedData).length > 0 ? (
            <div className="mt-6 bg-gray-100 p-4 rounded md:max-w-[30vw] overflow-x-auto">
              <h2 className="font-semibold mb-2 text-black">Submitted Data</h2>
              <pre className="text-sm text-gray-800 text-start whitespace-pre-wrap break-all">
              {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
            ) : (
              <p className="text-gray-500">No data submitted yet.</p>
            )}
        </div>
      </div>
    </>
  );
}

export default App;
