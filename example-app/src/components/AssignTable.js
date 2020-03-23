import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import CameraInfo from "./CameraInfo";
import TransferButton from "./TransferButton";

// import { ALL_CAMERAS_LIST } from "../services/queries";
// import { useQuery } from "@apollo/react-hooks";

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
  },
  title: {
    height: 40,
    textAlign: "center"
  },
  buttonGroup: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

function AssignTable(props) {
  const classes = useStyles();
  let data = [];

  if (props.person.data) {
    data = props.person.data.persons.allPersons;
    // console.log(data);
  }

  function createData(name, age, cameras) {
    return {
      name,
      age,
      cameras
    };
  }

  for (let i = 0; i < data.length; i++) {
    rows[i] = createData(data[i].name, data[i].age, data[i].cameras);
  }

  return (
    <div>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        Assign Camera for Users
      </Typography>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">CameraID</StyledTableCell>
              <StyledTableCell align="center">Transfer</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.person.loading ? (
              <TableRow>
                <StyledTableCell align="center" colSpan={4}>
                  <CircularProgress disableShrink />
                </StyledTableCell>
              </TableRow>
            ) : (
              rows.map(row => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.age}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.cameras.map(camera => (
                      <CameraInfo
                        key={camera.id}
                        className={classes.camera}
                        camera={camera}
                      />
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TransferButton persons={data} cameras={row} />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AssignTable;
