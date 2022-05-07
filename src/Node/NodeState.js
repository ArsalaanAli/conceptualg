export default class NodeState {
  constructor() {
    this.nodeState = ["cell", "unactive"];
    this.active = false;
  }
  stateString() {
    var str = "";
    for (var i = 0; i < this.nodeState.length; i++) {
      str += this.nodeState[i] + " ";
    }
    return str;
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
}
