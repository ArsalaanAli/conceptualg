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
  const [goalNode, setGoalNode] = useState([28, 10]);
  var doneSearching = false;
  const [draw, setDraw] = useState(false);
  const [dummy, setDummy] = useState(0);
  const [nodeStates, setNodeStates] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const stateArray = [];
    for (var i = 0; i < width; i++) {
      const temp = [];
      for (var j = 0; j < height; j++) {
        if (i === startNode[0] && j === startNode[1]) {
          temp.push(new NodeState("start"));
          continue;
        }
        if (i === goalNode[0] && j === goalNode[1]) {
          temp.push(new NodeState("goal"));
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

  const clearBoard = () => {
    const stateArray = [];
    for (var i = 0; i < width; i++) {
      const temp = [];
      for (var j = 0; j < height; j++) {
        if (i === startNode[0] && j === startNode[1]) {
          temp.push(new NodeState("start"));
          continue;
        }
        if (i === goalNode[0] && j === goalNode[1]) {
          temp.push(new NodeState("goal"));
          continue;
        }
        temp.push(new NodeState());
      }
      stateArray.push(temp);
    }
    setNodeStates(stateArray);
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
    if (!nodeStates[row][col].getGoal()) {
      var tempState = [...nodeStates];
      tempState[startNode[0]][startNode[1]].setUnactive();
      tempState[row][col].setStart();
      setStartNode([row, col]);
      setNodeStates(tempState);
    }
  };

  const setGoal = (row, col) => {
    var tempState = [...nodeStates];
    tempState[row][col].setGoal();
    setNodeStates(tempState);
  };

  const setPath = (row, col) => {
    var tempState = [...nodeStates];
    tempState[row][col].setPath();
    setNodeStates(tempState);
  };

  const setWall = (row, col) => {
    if (!nodeStates[row][col].getGoal() && !nodeStates[row][col].getStart()) {
      var tempState = [...nodeStates];
      tempState[row][col].setWall();
      setNodeStates(tempState);
    }
  };

  const tracePath = async (pathArray) => {
    for (var i = pathArray.length - 1; i >= 1; i--) {
      await delay(200);
      setPath(pathArray[i][0], pathArray[i][1]);
    }
  };

  const djikstra = async (row, col, pathArray) => {
    //check if goal has been found
    if (doneSearching) {
      return;
    }
    //check if at goal
    if (row === goalNode[0] && col === goalNode[1]) {
      console.log("found");
      doneSearching = true;
      tracePath(pathArray);
    }
    //checking boundaries
    if (row < 0 || col < 0 || row >= width || col >= height) {
      return;
    }
    //checking if already visited or wall
    if (nodeStates[row][col].getActive() || nodeStates[row][col].getWall()) {
      return;
    }
    //set active if not start or goal
    if (!nodeStates[row][col].getStart() && !nodeStates[row][col].getGoal()) {
      var tempState = [...nodeStates];
      tempState[row][col].setActive();
      setNodeStates(tempState);
    }
    await delay(200);
    djikstra(row + 1, col, [...pathArray, [row, col]]);
    djikstra(row - 1, col, [...pathArray, [row, col]]);
    djikstra(row, col - 1, [...pathArray, [row, col]]);
    djikstra(row, col + 1, [...pathArray, [row, col]]);
  };

  return (
    <div>
      <h1 className="title">VISUALG</h1>

      {/* CHOOSE DRAWING OPTION */}
      <div className="optionWrapper">
        <span className="optionSpan">
          <div className="startOption"></div>
          <h1 className="optionText">START NODE</h1>
        </span>

        <span className="optionSpan">
          <div className="wallOption"></div>
          <h1 className="optionText">WALL NODE</h1>
        </span>

        <span className="optionSpan">
          <div className="targetOption"></div>
          <h1 className="optionText">TARGET NODE</h1>
        </span>
      </div>

      {/* GRID */}
      <div
        className="grid"
        onMouseDown={() => {
          setDraw(true);
        }}
        onMouseUp={() => {
          setDraw(false);
        }}
      >
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
                      if (draw) {
                        setWall(rowkey, colkey);
                      }
                      setHover(rowkey, colkey);
                    }}
                    onMouseLeave={() => {
                      unsetHover(rowkey, colkey);
                    }}
                    onMouseDown={() => {
                      setWall(rowkey, colkey);
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
          djikstra(startNode[0], startNode[1], []);
        }}
      >
        VISUALIZE
      </button>
      <button
        className="clear-button"
        onClick={() => {
          clearBoard();
        }}
      >
        CLEAR BOARD
      </button>
    </div>
  );
}

export default App;
