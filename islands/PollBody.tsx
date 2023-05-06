import { useState, useEffect } from "preact/hooks";

type PollBodyProps = {
  question: string;
  options: string[];
  totalVotes: number;
  votes: Record<string, number>;
  isAlreadyVoted: boolean;
};

const PollBody = ({
  question,
  options,
  totalVotes,
  votes,
  isAlreadyVoted,
}: PollBodyProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);


  useEffect(() => {
    const url = window.location.href;
    const selectedOption = localStorage.getItem(url);
    setSelectedOption(selectedOption);
  }, [isAlreadyVoted]);


  const handleOptionSelect = async (option: string) => {
    if (isAlreadyVoted) {
      return; 
    }

    setSelectedOption(option);

    setIsProcessing(true);
    const url = window.location.href;
    localStorage.setItem(url, option);
    const body = JSON.stringify({ option });

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    window.location.reload();
  };

  const getOptionPercentage = (option: string) => {
    const voteCount = votes[option] || 0;
    return totalVotes > 0
      ? ((voteCount / totalVotes) * 100).toFixed(2)
      : "0.00";
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-gray-300 rounded shadow-sm">
      <h2 className="text-lg font-medium">{question}</h2>
      <ul className="mt-4 space-y-2">
        {options.map((option) => (
          <li key={option}>
            <button
              onClick={() => handleOptionSelect(option)}
              disabled={isAlreadyVoted || isProcessing}
              className={`w-full p-2 rounded-lg ${
                selectedOption === option
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              } focus:outline-none`}
            >
              <div className="flex justify-between items-center">
                <span>{option}</span>
                <span
                  className={`text-sm ${
                    option === selectedOption ? "text-white" : "text-gray-500"
                  }`}
                >
                  {getOptionPercentage(option) + "%"}
                </span>
              </div>
              <div className="h-1 mt-1 rounded-lg bg-blue-100">
                <div
                className={`h-full rounded-lg ${
                  selectedOption === option ? "bg-blue-800" : "bg-blue-200"
                }`}
                  style={{ width: `${getOptionPercentage(option)}%` }}
                />
              </div>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-gray-500">{totalVotes} votes</p>
    </div>
  );
};

export default PollBody;
