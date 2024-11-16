
import React, { useState } from "react";
import SortingVisualizer from "./SortingVisualizer";
import LinkedListVisualizer from "./LinkedListVisualizer";
import StackVisualizer from "./StackVisualizer";
import QueueVisualizer from "./QueueVisualizer";
import BinarySearchTreeVisualizer from "./BinarySearchTreeVisualizer";
import GraphVisualizer from "./GraphVisualizer";


import './App.css';

function App() {
  // State to track the selected component
  const [selectedComponent, setSelectedComponent] = useState("sorting");

  // Function to handle component selection
  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <button onClick={() => handleComponentSelect("sorting")}>Sorting Visualizer</button>
            </li>
            <li>
              <button onClick={() => handleComponentSelect("linked-list")}>Linked List Visualizer</button>
            </li>
            <li>
              <button onClick={() => handleComponentSelect("stack")}>Stack Visualizer</button>
            </li>
            <li>
              <button onClick={() => handleComponentSelect("queue")}>Queue Visualizer</button>
            </li>
            <li>
              <button onClick={() => handleComponentSelect("bst")}>Binary Search Tree</button>
            </li>
            <li>
              <button onClick={() => handleComponentSelect("graph")}>Graph Algorithms</button>
            </li>
          </ul>
        </nav>

        {/* Conditional rendering based on selected component */}
        {selectedComponent === "sorting" && <SortingVisualizer />}
        {selectedComponent === "linked-list" && <LinkedListVisualizer />}
        {selectedComponent === "stack" && <StackVisualizer />}
        {selectedComponent === "queue" && <QueueVisualizer />}
        {selectedComponent === "bst" && <BinarySearchTreeVisualizer />}
        {selectedComponent === "graph" && <GraphVisualizer />}
      </header>
    </div>
  );
}

export default App;
