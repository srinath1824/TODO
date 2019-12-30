import React, { useEffect } from "react";

import { Button, Icon, Label, Menu, Table } from "semantic-ui-react";
import TodoRow from "./todoRow";
import EditTodo from "./editTodo";
import { connect } from "react-redux";
import actionTypes from "../actions/todoActions";

// TodoTable is a Stateless component

const TodoTable = props => {
  console.log(props.todos);
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Options</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {!props.edit
          ? props.todos.map((t, index) => {
              return (
                <TodoRow
                  todo={t}
                  key={index}
                  completeTodo={e => props.completeTodo(index)}
                  startEditing={e => props.startEditing(index)}
                  deleteTodo={e => props.deleteTodo(index)}
                />
              );
            })
          : props.todos.map((t, index) => {
              if (t.editing) {
                console.log(index, t);
                return (
                  <EditTodo
                    editTodo={props.editTodo}
                    index={index}
                    confirmEditTodo={() => props.confirmEditTodo(index)}
                    cancelEditing={e => props.cancelEditing(index)}
                    key={index}
                    todo={t}
                  />
                );
              } else
                return (
                  <TodoRow
                    todo={t}
                    key={index}
                    completeTodo={e => props.completeTodo(t)}
                    startEditing={e => props.startEditing(index)}
                    deleteTodo={e => props.deleteTodo(index)}
                  />
                );
            })}
        <EditTodo createTodo={props.createTodo} />
      </Table.Body>
    </Table>
  );
};

const mapStateToProps = state => {
  return {
    todoItems: state.todoList.items,
    editFlag: state.editFlag,
    deleteFlag: state.deleteFlag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTodoItem: data => dispatch({ type: actionTypes.START_DELETING, data })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
