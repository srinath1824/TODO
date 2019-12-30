import React, { Component } from "react";
import "./App.css";
import TodoList from "./components/Todolist/todoList";
import TodoWithRedux from "./components/containers/todoContainer";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // return <TodoList />;
    return <TodoWithRedux />;
  }
}

export default App;
