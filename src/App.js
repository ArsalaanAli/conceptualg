import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import NodeState from "./Node/NodeState";
import "./Node/Node.css";
import "./grid.css";
import "./App.css";

function App() {
  const height = 20;
  const width = 30;
  const [startNode, setStartNode] = useState([15, 10]);
  const [dummy, setDummy] = useState(0);
  const [nodeStates, setNodeStates] = useState([]);

  useEffect(() => {
    const stateArray = [];
    for (var i = 0; i < width; i++) {
      const temp = [];
      for (var j = 0; j < height; j++) {
        if (i === startNode[0] && j === startNode[1]) {
          temp.push(new NodeState("start"));
          continue;
        }
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

  const setStart = (row, col) => {
    var tempState = [...nodeStates];
    tempState[startNode[0]][startNode[1]].setUnactive();
    tempState[row][col].setStart();
    setStartNode([row, col]);
    setNodeStates(tempState);
  };

  const chainEffect = async (row, col) => {
    if (row < 0 || row >= width || col < 0 || col >= height) {
      return;
    }
    if (!nodeStates[row][col].getStart() && nodeStates[row][col].getActive()) {
      return;
    }
    var tempState = [...nodeStates];
    if (!nodeStates[row][col].getStart()) {
      tempState[row][col].setActive();
    }
    setNodeStates(tempState);
    await delay(100);
    chainEffect(row + 1, col, tempState);
    chainEffect(row - 1, col, tempState);
    chainEffect(row, col + 1, tempState);
    chainEffect(row, col - 1, tempState);
  };

  return (
    <div>
      <h1 className="title">VISUALG</h1>

      {/* GRID */}
      <div className="grid">
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
                      setStart(rowkey, colkey);
                    }}
                  >
                    <div className={nodeStates[rowkey][colkey].stateString()} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        className="vis-button"
        onClick={() => {
          chainEffect(startNode[0], startNode[1]);
        }}
      >
        VISUALIZE
      </button>
    </div>
  );
}

export default App;
