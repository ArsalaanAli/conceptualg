export default class NodeState {
  constructor(type) {
    this.nodeState = ["cell"];
    if (type === "start") {
      this.nodeState.push("start");
    } else if (type === "goal") {
      this.nodeState.push("goal");
    } else {
      this.nodeState.push("unactive");
    }
  }
  stateString() {
    var str = "";
    for (var i = 0; i < this.nodeState.length; i++) {
      str += this.nodeState[i] + " ";
    }
    return str;
  }
  setStart() {
    this.start = true;
    this.nodeState = ["cell", "start"];
  }
  getStart() {
    return this.nodeState.includes("start");
  }
  setHover() {
    this.nodeState.push("hover");
  }
  unsetHover() {
    this.nodeState = this.nodeState.filter((e) => e !== "hover");
  }
  setActive() {
    this.nodeState.push("active");
  }
  getActive() {
    return this.nodeState.includes("active");
  }
  setUnactive() {
    this.nodeState = ["cell", "unactive"];
  }
  setGoal() {
    this.nodeState = ["cell", "goal"];
  }
  getGoal() {
    return this.nodeState.includes("goal");
  }
  setPath() {
    this.nodeState = ["cell", "path"];
  }
  setWall() {
    this.nodeState = ["cell", "wall"];
  }
  getWall() {
    return this.nodeState.includes("wall");
  }
}
