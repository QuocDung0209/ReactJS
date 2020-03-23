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
import AssignButton from "./AssignButton";
import AddButton from "./AddButton";

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
  }
}));

function CamerasTable(props) {
  const classes = useStyles();
  let data = [];

  if (props.camera.data && props.person.data) {
    data = props.camera.data.cameras.allCameras;
    var persons = props.person.data.persons.allPersons;
    // console.log(data);
  }

  function createData(name, id, isAvailable) {
    return {
      name,
      id,
      isAvailable
    };
  }

  for (let i = 0; i < data.length; i++) {
    rows[i] = createData(data[i].name, data[i].id, data[i].isAvailable);
  }

  return (
    <div>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        Cameras Available
      </Typography>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">
                <AddButton cameras={data} persons={persons} />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.camera.loading ? (
              <TableRow>
                <StyledTableCell align="center" colSpan={4}>
                  <CircularProgress disableShrink />
                </StyledTableCell>
              </TableRow>
            ) : (
              rows.map(row => {
                return row.isAvailable ? (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                    <StyledTableCell align="center">
                      <AssignButton
                        camera={row}
                        person={persons}
                        refetch={props}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ) : null;
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CamerasTable;
