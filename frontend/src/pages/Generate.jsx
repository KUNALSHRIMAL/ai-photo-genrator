import { useState } from "react";
import PromptBox from "../components/Promtbox";

function Generate() {

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const sendPrompt = async () => {

    const res = await fetch("http://127.0.0.1:8000/generate", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        text: prompt,
      }),
    });

    const data = await res.json();

    setResponse(data.message);
  };

  return (
    
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        AI Photo Generator
      </h1>

      <PromptBox
        prompt={prompt}
        setPrompt={setPrompt}
        sendPrompt={sendPrompt}
      />

      <div className="mt-10 text-2xl">
        {response}
      </div>

    </div>
  );
}

export default Generate;