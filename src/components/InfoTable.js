import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MapIcon from "@material-ui/icons/Map";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
// import data from "../data.js";

import { ALL_PERSONS_LIST } from "../services/queries";
import { useQuery } from "@apollo/react-hooks";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const rows = [];

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300
  },
  container: {
    maxHeight: 530
  },
  loading: {
    display: "flex",
    flexDirection: "row"
  }
}));

function InfoTable(props) {
  // the primary API for executing queries in an Apollo application
  // useQuery returns an object from Apollo Client that contains loading, error, and data
  const result = useQuery(ALL_PERSONS_LIST);
  const classes = useStyles();
  let data = [];

  if (result.data) {
    data = result.data.persons.allPersons;
    // console.log(data);
  }

  function createData(name, job, age, lat, lng) {
    return {
      name,
      job,
      age,
      view: (
        <Link
          to={{
            pathname: "/detail",
            search: `?name=${name}&age=${age}`
          }}
          style={{ color: "green", textDecoration: "none" }}
        >
          View
        </Link>
      ),
      position: [lat, lng]
    };
  }

  for (let i = 0; i < data.length; i++) {
    rows[i] = createData(
      data[i].name,
      data[i].job,
      data[i].age,
      data[i].lat,
      data[i].lng
    );
  }

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.loading ? (
            <TableRow>
              <StyledTableCell align="center" colSpan={4}>
                <CircularProgress disableShrink />
              </StyledTableCell>
            </TableRow>
          ) : (
            rows.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name} <br /> {row.job}
                </StyledTableCell>
                <StyledTableCell align="right">{row.age}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => props.onView(row)}>
                    <MapIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">{row.view}</StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InfoTable;
