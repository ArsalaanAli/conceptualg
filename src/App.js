import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import "./Node/Node.css";

function App() {
  const height = 10;
  const width = 50;
  const [dummy, setDummy] = useState(0);
  const [nodeStates, setNodeStates] = useState([]);

  useEffect(() => {
    setNodeStates([<Node />, <Node />, <Node />, <Node />]);
  }, []);

  const change = () => {
    setDummy(dummy + 1);
  };

  return (
    <div>
      {nodeStates.map((node, key) => {
        return <div key={key}>{node}</div>;
      })}
      <button
        onClick={() => {
          change();
        }}
      >
        change
      </button>
    </div>
  );
}

export default App;
