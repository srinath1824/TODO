import React, { Component } from "react";
import { Paper, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    border: "2px solid grey"
  },
  style: {
    padding: "20px"
  },
  color: {
    backgroundColor: "#e6e6ff"
  },
  colorWhite: {
    backgroundColor: "white"
  }
});

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    let items = this.props.items.map((item, index) => (
      <Grid
        container
        className={index % 2 === 0 ? classes.color : classes.colorWhite}
      >
        <Grid item xs={10}>
          <div style={{ textAlign: "left", padding: "30px" }} key={index}>
            {`${index + 1}. ${item}`}
          </div>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            aria-label="delete"
            className={classes.margin}
            onClick={() => this.props.deleted(index)}
            style={{ padding: "30px" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    ));
    if (this.props.items.length > 0) {
      return (
        <Grid container className={classes.style}>
          <Grid item xs={6}>
            <Paper className={classes.root}>{items}</Paper>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container>
          <Grid item xs={6}>
            <p>Please add items to the list to view</p>
          </Grid>
        </Grid>
      );
    }
  }
}

export default withStyles(styles)(List);
