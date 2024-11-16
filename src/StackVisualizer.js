import React, { useState } from 'react';
import './StackVisualizer.css';

function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [value, setValue] = useState("");

  // Push operation
  const push = () => {
    if (value !== "") {
      setStack((prevStack) => [...prevStack, value]);
      setValue(""); // Reset the input field
    }
  };

  // Pop operation
  const pop = () => {
    setStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
  };

  return (
    <div className="stack-visualizer">
      <div className="stack-container">
        {stack.map((item, index) => (
          <div key={index} className="stack-item">
            {item}
          </div>
        ))}
      </div>
      
      <div className="controls">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter value" 
        />
        <button onClick={push}>Push</button>
        <button onClick={pop}>Pop</button>
      </div>
    </div>
  );
}

export default StackVisualizer;
