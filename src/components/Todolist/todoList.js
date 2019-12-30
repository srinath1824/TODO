import React, { Component } from "react";
import List from "./list";
import "../../App.css";
import { TextField, Button, Grid } from "@material-ui/core";

class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      items: []
    };
  }

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  cancel(deleteIndex) {
    let afterDelete = this.state.items;
    afterDelete.splice(deleteIndex, 1);
    this.setState({ items: afterDelete });
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      term: "",
      items: [...this.state.items, this.state.term]
    });
  };

  render() {
    return (
      <div className="App">
        <Grid container>
          <Grid item xs={6}>
            <TextField
              label="Add Task"
              variant="outlined"
              value={this.state.term}
              onChange={this.onChange}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "10px" }}
              onClick={e => this.onSubmit(e)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <List
          items={this.state.items}
          deleted={listIndex => this.cancel(listIndex)}
        />
      </div>
    );
  }
}

export default Todolist;
