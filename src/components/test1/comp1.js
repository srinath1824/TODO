import React, { Component } from "react";

let x;
export default class comp1 extends Component {
  handleClick() {
    console.log("click open");
    x = window.open(
      "https://www.google.com",
      "_blank",
      "location=yes,scrollbars=yes,status=yes"
    );
  }
  render() {
    return (
      <div>
        <button onClick={() => this.handleClick()}>Open</button>
      </div>
    );
  }
}
