import React, { Component } from "react";
import "./App.css";
import TodoList from "./components/Todolist/todoList";
import { Button } from "@material-ui/core";
import TodoWithRedux from "./components/containers/todoContainer";
import { connect } from "react-redux";
import actionTypes from "./components/actions/todoActions";
import { select } from "redux-saga/effects";

let x;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: true
    };
  }

  handleClick() {
    this.props.windowCloseAction(false);
    x = window.open(
      "https://www.google.com",
      "_blank",
      "location=yes,scrollbars=yes,status=yes"
    );
    this.setState({ enabled: false });
  }

  handleCloseClick() {
    this.setState({ enabled: true });
    this.props.windowCloseAction(true);
  }

  render() {
    // const state = yield select();
    // const data = yield getData(state);
    // console.log(data);
    // return <TodoList />;
    if (this.props.windowCloseFlag) {
      x.close();
    }
    return (
      <React.Fragment>
        <TodoWithRedux />
        <div style={{ textAlign: "center", padding: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleClick()}
            disabled={!this.state.enabled}
          >
            Open Google
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleCloseClick()}
            disabled={this.state.enabled}
          >
            close Google
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    windowCloseFlag: state.todoList.windowClose
  };
};

const mapDispatchToProps = dispatch => {
  return {
    windowCloseAction: data =>
      dispatch({ type: actionTypes.WINDOW_CLOSE, data })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
