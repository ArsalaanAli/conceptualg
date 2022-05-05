import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = { nodeState: ["cell"] };
  }

  componentDidMount() {
    console.log(this.state);
  }

  stateString() {
    var str = "";
    for (var i = 0; i < this.state.nodeState.length; i++) {
      str += this.state.nodeState[i] + " ";
    }
    return str;
  }

  hover() {
    this.setState((prevState) => ({
      nodeState: [...prevState.nodeState, "hover"],
    }));
  }

  render() {
    return <div className={this.stateString()}></div>;
  }
}
