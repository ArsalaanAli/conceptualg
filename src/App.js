import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import NodeState from "./Node/NodeState";
import "./Node/Node.css";
import "./grid.css";

function App() {
  const height = 10;
  const width = 50;
  const [dummy, setDummy] = useState(0);
  const [nodeStates, setNodeStates] = useState([]);

  useEffect(() => {
    const stateArray = [];
    for (var i = 0; i < 30; i++) {
      const temp = [];
      for (var j = 0; j < 20; j++) {
        temp.push(new NodeState());
      }
      stateArray.push(temp);
    }
    setNodeStates(stateArray);
  }, []);

  const change = () => {
    setDummy(dummy + 1);
  };

  const setHover = (row, col) => {
    var tempState = [...nodeStates];
    tempState[row][col].hover();
    setNodeStates(tempState);
  };

  const unsetHover = (row, col) => {
    var tempState = [...nodeStates];
    tempState[row][col].unhover();
    setNodeStates(tempState);
  };

  return (
    <div>
      {nodeStates.map((row, key) => {
        var rowkey = key;
        return (
          <div className="row">
            {row.map((node, key) => {
              var colkey = key;
              return (
                <div
                  className="node-wrapper"
                  onMouseEnter={() => {
                    setHover(rowkey, colkey);
                  }}
                  onMouseLeave={() => {
                    unsetHover(rowkey, colkey);
                  }}
                >
                  <div className={nodeStates[rowkey][colkey].stateString()} />
                </div>
              );
            })}
          </div>
        );
      })}
      <button onClick={() => {}}>change</button>
    </div>
  );
}

export default App;
