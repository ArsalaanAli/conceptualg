import React, { useState, useEffect } from "react";
import NodeState from "./Node/NodeState";
import "./Node/Node.css";
import "./grid.css";
import "./App.css";

function App() {
  const height = 20;
  const width = 30;
  const paths = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const [startNode, setStartNode] = useState([15, 10]);
  const [goalNode, setGoalNode] = useState([28, 10]);
  var doneSearching = false;
  const algDesc = [
    "DJIKSTRA: SEARCHES SURROUNDING NODES AT EACH STEP, GARUNTEES SHORTEST PATH.",
    "a",
    "RANDOM WALK: SIMILAR TO HOW A DRUNK PERSON TRAVERSES A CITY, DOESNT GARUNTEE SHORTEST PATH (OBVIOUSLY)",
    "",
  ];
  const [draw, setDraw] = useState(false);
  const [dummy, setDummy] = useState(0);
  const [nodeStates, setNodeStates] = useState([]);
  const [queue, setQueue] = useState([]);
  const [optionClass, setOptionClass] = useState(["underline", "", "", ""]);
  const [algClass, setAlgClass] = useState([
    "algorithmOption underline",
    "algorithmOption",
    "algorithmOption",
    "algorithmOption",
  ]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [algOption, setAlgOption] = useState(0);
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

  function randint(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

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
    if (!nodeStates[row][col].getStart()) {
      var tempState = [...nodeStates];
      tempState[goalNode[0]][goalNode[1]].setUnactive();
      tempState[row][col].setGoal();
      setGoalNode([row, col]);
      setNodeStates(tempState);
    }
  };

  const setPath = (row, col) => {
    if (!nodeStates[row][col].getStart()) {
      var tempState = [...nodeStates];
      tempState[row][col].setPath();
      setNodeStates(tempState);
    }
  };

  const setWall = (row, col) => {
    if (!nodeStates[row][col].getGoal() && !nodeStates[row][col].getStart()) {
      var tempState = [...nodeStates];
      tempState[row][col].setWall();
      setNodeStates(tempState);
    }
  };

  const setUnactive = (row, col) => {
    if (!nodeStates[row][col].getGoal() && !nodeStates[row][col].getStart()) {
      var tempState = [...nodeStates];
      tempState[row][col].setUnactive();
      setNodeStates(tempState);
    }
  };

  const tracePath = async (pathArray, delayTime) => {
    for (var i = pathArray.length - 1; i >= 1; i--) {
      await delay(delayTime);
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
      doneSearching = true;
      tracePath(pathArray, 100);
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

  const astar = async () => {
    console.log(startNode);
    var currentNode = [...startNode];
    var path = [];
    var nextNode;
    while (!doneSearching) {
      var cost = 10000;
      for (var i = 0; i < 4; i++) {
        var curCost = heuristic(
          currentNode[0] + paths[i][0],
          currentNode[1] + paths[i][1]
        );
        if (curCost < cost) {
          cost = curCost;
          nextNode = paths[i];
        }
      }
      if (cost >= 10000) {
        break;
      }
      if (nodeStates[currentNode[0]][currentNode[1]].getStart()) {
        path.push([[currentNode[0]], [currentNode[1]]]);
      }
      currentNode[0] += nextNode[0];
      currentNode[1] += nextNode[1];
      await delay(200);
      if (
        !nodeStates[currentNode[0]][currentNode[1]].getGoal() &&
        !nodeStates[currentNode[0]][currentNode[1]].getStart()
      ) {
        setActive([currentNode[0]], [currentNode[1]]);
        path.push([[currentNode[0]], [currentNode[1]]]);
      }
    }
    if (doneSearching) {
      console.log(startNode);
      tracePath(path, 200);
    }
  };

  const heuristic = (row, col) => {
    if (nodeStates[row][col].getWall() || nodeStates[row][col].getActive()) {
      return 100000;
    }
    if (nodeStates[row][col].getGoal()) {
      doneSearching = true;
      return -100;
    }
    return Math.abs(goalNode[0] - row) + Math.abs(goalNode[1] - col);
  };

  const randomwalk = async (row, col, path) => {
    if (doneSearching) {
      return;
    }
    if (row < 0 || col < 0 || row >= width || col >= height) {
      return;
    }
    if (nodeStates[row][col].getGoal() && !doneSearching) {
      tracePath(path, 50);
      doneSearching = true;
      return true;
    }
    if (nodeStates[row][col].getActive() || nodeStates[row][col].getWall()) {
      return false;
    }
    if (!nodeStates[row][col].getStart()) {
      setActive(row, col);
    }
    await delay(100);
    for (var i = 0; i < 50; i++) {
      var randPath = paths[randint(0, 3)];
      if (
        await randomwalk(row + randPath[0], col + randPath[1], [
          ...path,
          [row, col],
        ])
      ) {
        break;
      }
    }
  };

  const drawSelectedOption = (row, col) => {
    switch (selectedOption) {
      case 0:
        setStart(row, col);
        break;
      case 1:
        setWall(row, col);
        break;
      case 2:
        setGoal(row, col);
        break;
      case 3:
        setUnactive(row, col);
        break;
      default:
        setStart(row, col);
        break;
    }
  };

  const runSelectedAlg = async (row, col) => {
    doneSearching = false;
    switch (algOption) {
      case 0:
        djikstra(row, col, []);
        break;
      case 1:
        astar();
        break;
      case 2:
        randomwalk(row, col, []);
        break;
      default:
        djikstra(row, col, []);
        break;
    }
  };

  return (
    <div>
      <h1 className="title">VISUALG</h1>

      {/* CHOOSING ALGORITHM */}
      <div className="algorithms">
        <h2
          className={algClass[0]}
          onClick={() => {
            setAlgClass([
              "algorithmOption underline",
              "algorithmOption",
              "algorithmOption",
              "algorithmOption",
            ]);
            setAlgOption(0);
          }}
        >
          DJIKSTRA
        </h2>
        <h2
          className={algClass[1]}
          onClick={() => {
            setAlgClass([
              "algorithmOption",
              "algorithmOption underline",
              "algorithmOption",
              "algorithmOption",
            ]);
            setAlgOption(1);
          }}
        >
          A*{" "}
        </h2>
        <h2
          className={algClass[2]}
          onClick={() => {
            setAlgClass([
              "algorithmOption",
              "algorithmOption",
              "algorithmOption underline",
              "algorithmOption",
            ]);
            setAlgOption(2);
          }}
        >
          RANDOM WALK{" "}
        </h2>
      </div>

      {/* CHOOSE DRAWING OPTION */}
      <div className="optionWrapper">
        <span
          className="optionSpan"
          onClick={() => {
            setOptionClass(["underline", "", "", ""]);
            setSelectedOption(0);
          }}
        >
          <div className="startOption"></div>
          <h1 className={"optionText " + optionClass[0]}>START NODE</h1>
        </span>

        <span
          className="optionSpan"
          onClick={() => {
            setOptionClass(["", "underline", "", ""]);
            setSelectedOption(1);
          }}
        >
          <div className="wallOption"></div>
          <h1 className={"optionText " + optionClass[1]}>WALL NODE</h1>
        </span>

        <span
          className="optionSpan"
          onClick={() => {
            setOptionClass(["", "", "underline", ""]);
            setSelectedOption(2);
          }}
        >
          <div className="targetOption"></div>
          <h1 className={"optionText " + optionClass[2]}>TARGET NODE</h1>
        </span>

        <span
          className="optionSpan"
          onClick={() => {
            setOptionClass(["", "", "", "underline"]);
            setSelectedOption(3);
          }}
        >
          <div className="unactiveOption"></div>
          <h1 className={"optionText " + optionClass[3]}>ERASE NODE</h1>
        </span>
      </div>

      <p className="desc">{algDesc[algOption]}</p>

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
                        drawSelectedOption(rowkey, colkey);
                      }
                      setHover(rowkey, colkey);
                    }}
                    onMouseLeave={() => {
                      unsetHover(rowkey, colkey);
                    }}
                    onMouseDown={() => {
                      drawSelectedOption(rowkey, colkey);
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
        onClick={async () => {
          await runSelectedAlg(startNode[0], startNode[1]);
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
