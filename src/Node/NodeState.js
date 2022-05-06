export default class NodeState {
  constructor() {
    this.nodeState = ["cell", "unactive"];
  }
  stateString() {
    var str = "";
    for (var i = 0; i < this.nodeState.length; i++) {
      str += this.nodeState[i] + " ";
    }
    return str;
  }
  hover() {
    this.nodeState.push("hover");
  }
  unhover() {
    this.nodeState = this.nodeState.filter((e) => e !== "hover");
  }
}
