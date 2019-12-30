import React, { Component } from "react";
import "./App.css";
import TodoList from "./components/Todolist/todoList";
import { Button } from "@material-ui/core";
import TodoWithRedux from "./components/containers/todoContainer";

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    window.open(
      "https://www.google.com",
      "_blank",
      "location=yes,scrollbars=yes,status=yes"
    );
  }

  render() {
    // return <TodoList />;
    return (
      <React.Fragment>
        <TodoWithRedux />
        <div style={{ textAlign: "center", padding: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleClick()}
          >
            Open Google
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
