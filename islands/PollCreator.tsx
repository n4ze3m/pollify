import { useState } from "preact/hooks";
import IconTrash from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trash.tsx";
type PollOption = string;

function PollCreator() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<PollOption[]>(["", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setQuestion(target.value);
  };

  const handleOptionChange = (event: Event, index: number) => {
    const target = event.target as HTMLInputElement;
    const newOptions = [...options];
    newOptions[index] = target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setIsLoading(true);
    // check options are not empty
    const optionsAreValid = options.every((option) => option.trim() !== "");
    if (!optionsAreValid) {
      alert("Please fill all options");
      setIsLoading(false);
      return;
    }
    const url = window.location.href;
    const body = JSON.stringify({ question, options });
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const result = await response.json();
    window.location.href = `/${result.id}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        "max-w-md mx-auto p-4 bg-white border border-gray-300 rounded shadow-sm"
      }
    >
      <div className={"mb-4"}>
        <input
          type="text"
          id="question"
          placeholder="Ask a question"
          required
          value={question}
          onInput={handleQuestionChange}
          className={
            "w-full p-2 border border-gray-300 rounded bg-gray-50 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          }
        />
      </div>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-start">
          <span className="bg-white pr-2 text-sm text-gray-500">options</span>
        </div>
      </div>
      <div className={"mb-4"}>
        {options.map((option, index) => (
          <div key={index} className={"flex items-center mb-2"}>
            <input
              type="text"
              value={option}
              placeholder={`Option ${index + 1}`}
              onInput={(event) => handleOptionChange(event, index)}
              className={
                "w-full p-2 border border-gray-300 rounded bg-gray-50 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              }
            />
            {index > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className={
                  "ml-2 p-1 bg-red-600 text-white rounded border border-transparent hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                }
              >
                <IconTrash className={"w-6 h-6"} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className={
            "inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          }
        >
          Add Option
        </button>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={
          " w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        }
      >
        {isLoading ? "Creating Poll..." : "Create Poll"}
      </button>
    </form>
  );
}

export default PollCreator;
