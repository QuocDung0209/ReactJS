import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  back: {
    marginLeft: 10
  }
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Detail(props) {
  let query = useQuery();

  const classes = useStyles();

  return (
    <Paper className={classes.root} square elevation={0}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textPrimary"
          gutterBottom
        >
          Detail
        </Typography>
        <Typography variant="body2" component="p">
          Name: {query.get("name")} <br /> Age: {query.get("age")}
        </Typography>
      </CardContent>
      <CardActions className={classes.back}>
        <NavLink exact to="/">
          Back to home
        </NavLink>
      </CardActions>
    </Paper>
  );
}

export default Detail;
