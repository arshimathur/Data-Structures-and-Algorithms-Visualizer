import React, { useState } from "react";

// Helper function to create graph representation
const createGraph = (vertices) => {
  const graph = {};
  for (let i = 0; i < vertices; i++) {
    graph[i] = [];
  }
  return graph;
};

const GraphVisualizer = () => {
  const [graph, setGraph] = useState(createGraph(6)); // A graph with 6 vertices
  const [visited, setVisited] = useState([]);
  const [path, setPath] = useState([]);

  const dfs = (graph, start, visited, path) => {
    visited[start] = true;
    path.push(start);

    for (let neighbor of graph[start]) {
      if (!visited[neighbor]) {
        dfs(graph, neighbor, visited, path);
      }
    }
  };

  const bfs = (graph, start) => {
    const queue = [start];
    const visited = [];
    const path = [];
    visited[start] = true;

    while (queue.length) {
      const node = queue.shift();
      path.push(node);

      for (let neighbor of graph[node]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }
    return path;
  };

  const dijkstra = (graph, start, end) => {
    const dist = Array(graph.length).fill(Infinity);
    const prev = Array(graph.length).fill(null);
    dist[start] = 0;
    const queue = [start];

    while (queue.length > 0) {
      const node = queue.shift();
      for (let neighbor of graph[node]) {
        const alt = dist[node] + 1;
        if (alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = node;
          queue.push(neighbor);
        }
      }
    }

    // Reconstruct the path from end to start
    const path = [];
    let currentNode = end;
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = prev[currentNode];
    }
    return path;
  };

  const handleDFS = () => {
    const start = 0; // starting vertex
    const path = [];
    const visited = Array(graph.length).fill(false);
    dfs(graph, start, visited, path);
    setVisited(visited);
    setPath(path);
  };

  const handleBFS = () => {
    const start = 0; // starting vertex
    const path = bfs(graph, start);
    setPath(path);
  };

  const handleDijkstra = () => {
    const start = 0; // starting vertex
    const end = 5; // ending vertex
    const path = dijkstra(graph, start, end);
    setPath(path);
  };

  return (
    <div>
      <h2>Graph Visualizer</h2>
      <div>
        <button onClick={handleDFS}>Run DFS</button>
        <button onClick={handleBFS}>Run BFS</button>
        <button onClick={handleDijkstra}>Run Dijkstra</button>
      </div>
      <div>
        <h3>Visited Nodes: {visited.join(", ")}</h3>
        <h3>Path: {path.join(" -> ")}</h3>
      </div>
    </div>
  );
};

export default GraphVisualizer;

