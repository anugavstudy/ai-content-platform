import React, { useState, useRef } from "react";
import FancyButton from "./components/Buttons";


export default function App() {
  const [task, setTask] = useState("summarize");
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);
  const [output, setOutput] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, input }),
    });
    const data = await res.json();
    setOutput(data.result);
    // Scroll to output after it's rendered
    setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  const outputRef = useRef(null);

  return (
  <div className="min-h-screen flex flex-col items-center p-8 app-root">
      <h1 className="text-3xl font-bold mb-6">AI Content Generator</h1>
      <h3 className="text-lg mb-6 text-muted">Choose a task, enter your text, and generate AI-powered content!</h3>

      <div className="flex gap-4 mb-4">
        <div className="flex gap-2" role="tablist" aria-label="Task selector">
          <FancyButton
            variant="simple"
            selected={task === "summarize"}
            onClick={() => setTask("summarize")}
            ariaLabel="Summarize"
          >
            Summarize
          </FancyButton>

          <FancyButton
            variant="simple"
            selected={task === "caption"}
            onClick={() => setTask("caption")}
            ariaLabel="Generate Caption"
          >
            Generate Caption
          </FancyButton>

          <FancyButton
            variant="simple"
            selected={task === "rewrite"}
            onClick={() => setTask("rewrite")}
            ariaLabel="Rewrite"
          >
            Rewrite
          </FancyButton>
        </div>
      </div>

      <textarea
        placeholder="Enter your text here..."
        value={input}
        ref={textareaRef}
        onChange={(e) => {
          setInput(e.target.value);
          // auto-resize: reset height then expand to scrollHeight
          const ta = textareaRef.current;
          if (ta) {
            ta.style.height = "auto";
            ta.style.height = ta.scrollHeight + "px";
          }
        }}
        className="w-full max-w-xl p-3 mb-4 input-box"
        rows={4}
      />

      <div className="mb-2">
        <FancyButton variant="simple" onClick={handleGenerate} className="generate-btn">
          Generate
        </FancyButton>
      </div>

      {output && (
        <div ref={outputRef} className="w-full max-w-xl mt-6 p-4 rounded panel">
          <h2 className="font-semibold mb-2">Output:</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}
