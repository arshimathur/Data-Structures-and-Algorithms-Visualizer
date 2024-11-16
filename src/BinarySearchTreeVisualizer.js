import React, { useState } from "react";

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const BinarySearchTreeVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [treeArray, setTreeArray] = useState([]);

  const insert = (root, value) => {
    if (root === null) {
      return new Node(value);
    }
    if (value < root.value) {
      root.left = insert(root.left, value);
    } else if (value > root.value) {
      root.right = insert(root.right, value);
    }
    return root;
  };

  const deleteNode = (root, value) => {
    if (root === null) return root;

    if (value < root.value) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = deleteNode(root.right, value);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      let temp = findMin(root.right);
      root.value = temp.value;
      root.right = deleteNode(root.right, temp.value);
    }
    return root;
  };

  const findMin = (root) => {
    let current = root;
    while (current && current.left !== null) {
      current = current.left;
    }
    return current;
  };

  const search = (root, value) => {
    if (root === null || root.value === value) {
      return root;
    }
    if (value < root.value) {
      return search(root.left, value);
    }
    return search(root.right, value);
  };

  const handleInsert = (value) => {
    setRoot((prevRoot) => {
      const newRoot = insert(prevRoot, value);
      return newRoot;
    });
    updateTreeArray();
  };

  const handleDelete = (value) => {
    setRoot((prevRoot) => {
      const newRoot = deleteNode(prevRoot, value);
      return newRoot;
    });
    updateTreeArray();
  };

  const handleSearch = (value) => {
    const result = search(root, value);
    alert(result ? `Found: ${result.value}` : "Value not found");
  };

  const updateTreeArray = () => {
    const arr = [];
    const inOrderTraversal = (node) => {
      if (node === null) return;
      inOrderTraversal(node.left);
      arr.push(node.value);
      inOrderTraversal(node.right);
    };
    inOrderTraversal(root);
    setTreeArray(arr);
  };

  return (
    <div>
      <h2>Binary Search Tree Visualizer</h2>
      <div>
        <button onClick={() => handleInsert(Math.floor(Math.random() * 100))}>
          Insert Random Node
        </button>
        <button onClick={() => handleDelete(Math.floor(Math.random() * 100))}>
          Delete Random Node
        </button>
        <button onClick={() => handleSearch(50)}>Search for 50</button>
      </div>
      <div>
        <h3>In-order Traversal: {treeArray.join(", ")}</h3>
      </div>
    </div>
  );
};

export default BinarySearchTreeVisualizer;
