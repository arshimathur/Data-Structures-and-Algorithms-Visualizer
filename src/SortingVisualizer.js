// SortingVisualizer.js
import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

const ARRAY_SIZE = 20;

function SortingVisualizer() {
  const [array, setArray] = useState([]);

  // Function to generate a random array
  const generateRandomArray = () => {
    const newArray = Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArray);
  };

  // Bubble Sort algorithm with animations
  const bubbleSort = async () => {
    const arr = array.slice();
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  // Swap elements
          setArray([...arr]);  // Update array state to reflect swap
          await new Promise((resolve) => setTimeout(resolve, 100));  // Delay for animation
        }
      }
    }
  };

  // Selection Sort algorithm with animations
  const selectionSort = async () => {
    const arr = array.slice(); // Make a copy of the array
    
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      // Find the minimum element in the remaining unsorted array
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      // Swap if the current element is not the minimum
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);  // Update the array state to reflect the swap
        
        // Delay to visualize each step
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  };

  // Generate a new array on component mount
  useEffect(() => {
    generateRandomArray();
  }, []);

  return (
    <div className="sorting-visualizer">
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              backgroundColor: 'teal',
            }}
          ></div>
        ))}
      </div>
      <div className="controls">
        <button onClick={generateRandomArray}>Generate New Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={selectionSort}>Selection Sort</button>
      </div>
    </div>
  );
}

export default SortingVisualizer;
