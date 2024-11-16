import React, { useState } from 'react';
import './LinkedListVisualizer.css';

const LinkedListVisualizer = () => {
  // Define state to hold the linked list and the current value to be inserted
  const [linkedList, setLinkedList] = useState([]);
  const [newNodeValue, setNewNodeValue] = useState('');

  // Linked list node structure
  const Node = (value, next = null) => {
    return { value, next };
  };

  // Function to insert a node at the end of the list
  const insertNode = () => {
    if (newNodeValue === '') return;
    const newNode = Node(newNodeValue);
    if (linkedList.length === 0) {
      setLinkedList([newNode]);
    } else {
      const updatedList = [...linkedList];
      let current = updatedList[updatedList.length - 1];
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
      setLinkedList(updatedList);
    }
    setNewNodeValue('');
  };

  // Function to delete the first node
  const deleteNode = () => {
    if (linkedList.length === 0) return;
    const updatedList = [...linkedList];
    updatedList.shift();  // Remove the first node
    setLinkedList(updatedList);
  };

  // Function to traverse the list
  const traverseList = () => {
    let current = linkedList;
    const traversal = [];
    while (current.length > 0) {
      traversal.push(current[0].value);
      current = current[0].next ? [current[0].next] : [];
    }
    alert(`Traversal: ${traversal.join(' -> ')}`);
  };

  return (
    <div className="linked-list-visualizer">
      <h1>Linked List Visualizer</h1>
      <div className="controls">
        <input
          type="number"
          value={newNodeValue}
          onChange={(e) => setNewNodeValue(e.target.value)}
          placeholder="Enter Node Value"
        />
        <button onClick={insertNode}>Insert Node</button>
        <button onClick={deleteNode}>Delete Node</button>
        <button onClick={traverseList}>Traverse List</button>
      </div>
      <div className="linked-list">
        {linkedList.map((node, idx) => (
          <div key={idx} className="node">
            <span className="node-value">{node.value}</span>
            {node.next && <span className="arrow"> → </span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
