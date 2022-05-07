import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import NodeState from "./Node/NodeState";
import "./Node/Node.css";
import "./grid.css";

function App() {
  const height = 20;
  const width = 30;
  const [dummy, setDummy] = useState(0);
  const [nodeStates, setNodeStates] = useState([]);

  useEffect(() => {
    const stateArray = [];
    for (var i = 0; i < width; i++) {
      const temp = [];
      for (var j = 0; j < height; j++) {
        temp.push(new NodeState());
      }
      stateArray.push(temp);
    }
    setNodeStates(stateArray);
  }, []);

  const change = () => {
    setDummy(dummy + 1);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const setHover = (row, col) => {
    var tempState = [...nodeStates];
    tempState[row][col].setHover();
    setNodeStates(tempState);
  };

  const unsetHover = (row, col) => {
    var tempState = [...nodeStates];
    tempState[row][col].unsetHover();
    setNodeStates(tempState);
  };
  const setActive = (row, col) => {
    var tempState = [...nodeStates];
    tempState[row][col].setActive();
    setNodeStates(tempState);
  };

  const chainEffect = async (row, col) => {
    if (row < 0 || row >= width || col < 0 || col >= height) {
      return;
    }
    if (nodeStates[row][col].getActive()) {
      return;
    }
    var tempState = [...nodeStates];
    tempState[row][col].setActive();
    setNodeStates(tempState);
    await delay(100);
    chainEffect(row + 1, col, tempState);
    chainEffect(row - 1, col, tempState);
    chainEffect(row, col + 1, tempState);
    chainEffect(row, col - 1, tempState);
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
                  onMouseUp={() => {
                    chainEffect(rowkey, colkey);
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
