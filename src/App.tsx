import "./App.css";
import "./index.css";
function App() {
  return (
    <>
      <h1 className=" text-3xl text-blue-950 font-semibold mb-10">
        Dynamic Form Field
      </h1>
      <div className="wrapper min-w-6xl min-h-96 bg-white rounded-2xl border border-gray-200 shadow-lg p-4 flex">
        <div className="flex-1 flex items-center justify-center text-black">
          Fields
        </div>
        <div className="flex-1 flex items-center justify-center text-black">
          Preview
        </div>
      </div>
    </>
  );
}

export default App;
