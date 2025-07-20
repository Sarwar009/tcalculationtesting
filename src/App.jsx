import React, { useState, useEffect } from 'react';

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(() => JSON.parse(localStorage.getItem("history")) || []);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 30);
    setInput(value);
  };

  const handleClick = () => {
    if (!/^\d{2,30}$/.test(input)) {
      alert("Enter a number between 2 and 30 digits");
      return;
    }
    let steps = [input];
    let current = input;
    while (current.length > 1) {
      let next = "";
      for (let i = 0; i < current.length - 1; i++) {
        next += (parseInt(current[i]) + parseInt(current[i + 1])) % 10;
      }
      steps.push(next);
      current = next;
    }
    const updatedResults = [steps, ...results];
    setResults(updatedResults);
    localStorage.setItem("history", JSON.stringify(updatedResults));
    setInput("");
  };

  return (
    <div style={{ textAlign: 'center', padding: '30px', width: '100%' }}>
      <h1 style={{ color: 'red' }}>Digit Collapse Sum</h1>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter 2–30 digit number"
        style={{ padding: '10px', fontSize: '18px', width: '300px', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer', marginBottom: '20px' }}>
        Start
      </button>
      {results.map((lines, idx) => (
        <div key={idx} style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ fontFamily: 'monospace', fontSize: '24px', margin: '5px 0' }}>{line}</div>
          ))}
        </div>
      ))}
    </div>
  );
}