import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = { nodeState: ["unactive"] };
  }

  componentDidMount() {
    console.log(this.state);
  }

  stateString() {
    var str = "";
    console.log(this.state);
    for (var i = 0; i < this.state.nodeState.length; i++) {
      str += this.state.nodeState[i] + " ";
    }
    return str;
  }

  render() {
    return <div className={this.stateString()}></div>;
  }
}
