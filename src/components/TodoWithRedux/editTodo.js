import React, { Component } from "react";
import actionTypes from "../actions/todoActions";
import { Button, Icon, Label, Menu, Table } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditTodo extends Component {
  constructor(props) {
    super(props);
    // If props.todo exists this component is used to  Edit a Todo,
    // else this is a Create New Todo Component

    if (this.props.todo) {
      this.state = {
        ...this.props.todo
      };
    } else {
      this.state = {
        ...this.emptyTodo()
      };
    }
  }

  //Initializes a Empty Todo Object

  emptyTodo = () => {
    return { title: "", description: "", date: new Date() };
  };

  // Input change handling methods

  changeNewTitle = event => {
    this.setState({ title: event.target.value });
  };

  changeNewDescription = event => {
    this.setState({ description: event.target.value });
  };

  changeNewDate = event => {
    this.setState({ date: event });
  };

  // Form submission methods

  createTodo = event => {
    this.resetTodo();
    this.props.createTodo(this.state);
  };
  editTodo = event => {
    console.log(this.state, this.props.index);
    let editedItem = this.props.todoItems;
    editedItem.splice(this.props.index, 1, this.state);
    editedItem[this.props.index]["editing"] = false;
    this.props.editTodo(editedItem);
    this.props.confirmEditTodo();
  };

  // Modifying the inputs indirectly methods

  resetTodo = () => {
    this.setState({ title: "", description: "", date: new Date() });
  };
  cancelEditing = () => {
    this.props.cancelEditing();
  };

  // Convert the date to moment object for the React DatePicker

  getDateForDatePicker() {
    return this.state.date;
  }

  // The two local components - EditOptions and AddOptions simply maps their events
  // to the state events of their parent compoent through the props

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          <Input
            placeholder="Title"
            value={this.state.title}
            onChange={this.changeNewTitle}
          />
        </Table.Cell>

        <Table.Cell>
          <Input
            placeholder="Description"
            value={this.state.description}
            onChange={this.changeNewDescription}
          />
        </Table.Cell>

        <Table.Cell>
          {/* React Datepicker gets the moment date from the class method */}

          <DatePicker
            selected={this.getDateForDatePicker()}
            onChange={this.changeNewDate}
          />
        </Table.Cell>

        {/* The options component takes the inputs and decide if It's an option for a Edit Todo or Add New Todo */}

        <Options
          todo={this.state}
          editTodo={this.editTodo}
          createTodo={this.createTodo}
          resetTodo={this.resetTodo}
          cancelEdit={this.cancelEditing}
        />
      </Table.Row>
    );
  }
}

const Options = props => {
  if (props.todo && props.todo.editing) {
    return EditOptions(props);
  } else {
    return AddOptions(props);
  }
};

const EditOptions = props => {
  return (
    <Table.Cell>
      <Button color="green" onClick={props.editTodo}>
        Edit
      </Button>
      <Button color="blue" onClick={props.cancelEdit}>
        Cancel
      </Button>
    </Table.Cell>
  );
};

const AddOptions = props => {
  return (
    <Table.Cell>
      <Button color="green" onClick={props.createTodo}>
        Create
      </Button>
      <Button color="blue" onClick={props.resetTodo}>
        Reset
      </Button>
    </Table.Cell>
  );
};

// The option component decides the component usage

const mapStateToProps = state => {
  return {
    todoItems: state.todoList.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: data => dispatch({ type: actionTypes.CLICK_CREATE, data }),
    editTodo: data => dispatch({ type: actionTypes.CLICK_EDIT, data })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
