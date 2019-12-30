import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import TodoTable from "../TodoWithRedux/todoTable";
import actionTypes from "../actions/todoActions";

export class TodoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      deleted: 0
    };
  }

  // Todo Container methods dispatch the actions to the reducer functions. Ordered by CRUD Order

  //Create
  createTodo = todo => {
    let create = { ...todo };
    this.props.createTodo(create);
  };

  //edit
  editTodo = id => {
    let editFlag = this.props.todoItems;
    editFlag[id]["editing"] = false;
    this.props.editItem(editFlag);
    this.setState({ edit: false });
  };

  //Update
  startEditing = id => {
    let editFlag = this.props.todoItems;
    editFlag[id]["editing"] = true;
    this.props.editItem(editFlag);
    this.setState({ edit: true });
  };
  cancelEditing = id => {
    let editFlag = this.props.todoItems;
    editFlag[id]["editing"] = false;
    this.props.editItem(editFlag);
    this.setState({ edit: false });
  };
  completeTodo = id => {
    let editFlag = this.props.todoItems;
    editFlag[id]["completed"] = true;
    this.props.completeItem(editFlag);
  };

  //Delete
  deleteTodo = id => {
    let count = this.state.deleted;
    let afterDeletion = this.props.todoItems;
    afterDeletion.splice(id, 1);
    this.props.deleteItem(afterDeletion);
    this.setState({ deleted: count + 1 });
  };

  render() {
    console.log(this.props.todoItems);
    return (
      <div className="todo-container">
        <TodoTable
          todos={this.props.todoItems}
          edit={this.state.edit}
          delete={this.state.deleted}
          createTodo={this.createTodo}
          startEditing={this.startEditing}
          cancelEditing={this.cancelEditing}
          confirmEditTodo={this.editTodo}
          completeTodo={this.completeTodo}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

// Define the property types of this Container Component

TodoContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  todoItems: PropTypes.array.isRequired
};

// This maps the state to the property of the component

function mapStateToProps(state, ownProps) {
  return {
    todoItems: state.todoList.items
  };
}

// This maps the dispatch to the property of the component

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(TodoActions, dispatch)
    createTodo: data => dispatch({ type: actionTypes.CLICK_CREATE, data }),
    editTodoItem: data => dispatch({ type: actionTypes.START_EDITING, data }),
    editItem: data => dispatch({ type: actionTypes.EDIT_ITEM, data }),
    deleteItem: data => dispatch({ type: actionTypes.DELETE_ITEM, data }),
    deleteTodoItem: data =>
      dispatch({ type: actionTypes.START_DELETING, data }),
    completeItem: data => dispatch({ type: actionTypes.COMPLETE_TODO, data })
  };
}

// The connect function connects the Redux Dispatch and state to the Todo Container Component.
// Without this the Component wont be functional.

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
