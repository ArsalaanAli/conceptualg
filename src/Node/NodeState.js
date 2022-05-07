export default class NodeState {
  constructor(type) {
    this.nodeState = ["cell"];
    if (type === "start") {
      this.nodeState.push("start");
      this.active = true;
      this.start = true;
    } else {
      this.nodeState.push("unactive");
      this.active = false;
      this.start = false;
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
    return this.start;
  }
  setHover() {
    this.nodeState.push("hover");
  }
  unsetHover() {
    this.nodeState = this.nodeState.filter((e) => e !== "hover");
  }
  setActive() {
    this.nodeState.push("active");
    this.active = true;
  }
  getActive() {
    return this.active;
  }
  setUnactive() {
    this.active = false;
    this.start = false;
    this.nodeState = ["cell", "unactive"];
  }
}
