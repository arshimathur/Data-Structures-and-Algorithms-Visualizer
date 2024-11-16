import React, { useState } from 'react';
import './QueueVisualizer.css';

function QueueVisualizer() {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState("");

  // Enqueue operation
  const enqueue = () => {
    if (value !== "") {
      setQueue((prevQueue) => [...prevQueue, value]);
      setValue(""); // Reset the input field
    }
  };

  // Dequeue operation
  const dequeue = () => {
    setQueue((prevQueue) => prevQueue.slice(1));
  };

  return (
    <div className="queue-visualizer">
      <div className="queue-container">
        {queue.map((item, index) => (
          <div key={index} className="queue-item">
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
        <button onClick={enqueue}>Enqueue</button>
        <button onClick={dequeue}>Dequeue</button>
      </div>
    </div>
  );
}

export default QueueVisualizer;
