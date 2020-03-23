import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CamerasTable from "../components/CamerasTable";
import AssignTable from "../components/AssignTable";

import { ALL_CAMERAS_LIST, ALL_PERSONS_LIST } from "../services/queries";
import { useQuery } from "@apollo/react-hooks";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    height: 120,
    backgroundColor: "white",
    margin: "auto",
    textAlign: "center"
  },
  gridItem: {
    height: 550,
    marginTop: 40,
    margin: "auto"
  }
});

export default function CameraManagement() {
  // the primary API for executing queries in an Apollo application
  // useQuery returns an object from Apollo Client that contains loading, error, and data
  const camera = useQuery(ALL_CAMERAS_LIST);
  const person = useQuery(ALL_PERSONS_LIST);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={11} xs={11} className={classes.title}>
          <h1>Cameras Management</h1>
        </Grid>
        <Grid item lg={6} xs={11} className={classes.gridItem}>
          <AssignTable camera={camera} person={person} />
        </Grid>
        <Grid item lg={3} xs={11} className={classes.gridItem}>
          <CamerasTable camera={camera} person={person} />
        </Grid>
      </Grid>
    </div>
  );
}
