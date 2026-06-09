function PromptBox({ prompt, setPrompt, sendPrompt }) {

  return (

    <div className="flex gap-4">

      <input
        type="text"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-[500px] p-4 rounded-lg text-black"
      />

      <button
        onClick={sendPrompt}
        className="bg-blue-600 px-6 py-4 rounded-lg"
      >
        Generate
      </button>

    </div>
  );
}

export default PromptBox;