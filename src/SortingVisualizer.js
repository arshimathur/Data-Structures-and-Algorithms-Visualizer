import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

const MIN_ARRAY_SIZE = 5;
const MAX_ARRAY_SIZE = 50;

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(100); // Speed in ms (default to 100ms)
  const [arraySize, setArraySize] = useState(20); // Default array size

  // Function to generate a random array
  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 10);
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
          await new Promise((resolve) => setTimeout(resolve, speed));  // Delay for animation based on speed
        }
      }
    }
  };

  // Selection Sort algorithm with animations
  const selectionSort = async () => {
    const arr = array.slice();
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
        await new Promise((resolve) => setTimeout(resolve, speed));  // Delay for animation
      }
    }
  };

  // Merge Sort algorithm with animations
  const mergeSort = async () => {
    const arr = array.slice();
    const animations = [];
    await mergeSortHelper(arr, 0, arr.length - 1, animations);

    // Visualize the merge steps
    for (let animation of animations) {
      const [left, right, merged, isMerge] = animation;
      if (isMerge) {
        setArray([...merged]);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }
  };

  // Merge sort helper function
  const mergeSortHelper = async (arr, start, end, animations) => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      await mergeSortHelper(arr, start, mid, animations);
      await mergeSortHelper(arr, mid + 1, end, animations);
      await merge(arr, start, mid, end, animations);
    }
  };

  // Merge two sorted subarrays
  const merge = async (arr, start, mid, end, animations) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let leftIndex = 0, rightIndex = 0, merged = [];
    
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        merged.push(left[leftIndex++]);
      } else {
        merged.push(right[rightIndex++]);
      }
    }

    // Collect the remaining elements
    while (leftIndex < left.length) merged.push(left[leftIndex++]);
    while (rightIndex < right.length) merged.push(right[rightIndex++]);

    for (let i = start; i <= end; i++) {
      arr[i] = merged[i - start];
    }

    animations.push([left, right, merged, true]);
  };

  // Insertion Sort algorithm with animations
  const insertionSort = async () => {
    const arr = array.slice();
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);  // Update the array state to reflect the shift
        await new Promise((resolve) => setTimeout(resolve, speed));  // Delay for animation
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
  };

  // Quick Sort algorithm with animations
  const quickSort = async () => {
    const arr = array.slice();
    await quickSortHelper(arr, 0, arr.length - 1);
  };

  // Quick Sort helper function
  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  // Partition function for Quick Sort
  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, speed));  // Delay for animation
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, speed));  // Delay for animation

    return i + 1;
  };

  // Heap Sort algorithm with animations
  const heapSort = async () => {
    const arr = array.slice();
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap root and last element
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));  // Delay for animation
      await heapify(arr, i, 0); // Heapify the root element
    }
  };

  // Heapify function for Heap Sort
  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap elements
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));  // Delay for animation
      await heapify(arr, n, largest); // Recursively heapify the affected subtree
    }
  };

  useEffect(() => {
    generateRandomArray(); // Generate a random array when component mounts
  }, [arraySize]);

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
        <button onClick={insertionSort}>Insertion Sort</button>
        <button onClick={selectionSort}>Selection Sort</button>
        <button onClick={mergeSort}>Merge Sort</button>
        <button onClick={quickSort}>Quick Sort</button>
        <button onClick={heapSort}>Heap Sort</button>
        
        <div className="slider-controls">
          <label>
            Array Size: {arraySize}
            <input
              type="range"
              min={MIN_ARRAY_SIZE}
              max={MAX_ARRAY_SIZE}
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
            />
          </label>
          
          <label>
            Speed: {speed} ms
            <input
              type="range"
              min={50}
              max={500}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default SortingVisualizer;

