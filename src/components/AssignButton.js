import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useMutation } from "@apollo/react-hooks";

import {
  UPDATE_CAMERA,
  ALL_PERSONS_AND_CAMERAS_LIST
} from "../services/queries";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const rows = [];

export default function DialogSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [variable, setVariable] = React.useState({ variables: {} });
  const [assignCamera] = useMutation(UPDATE_CAMERA);

  const handleChange = event => {
    setName(event.target.value || "");
    setVariable({
      variables: {
        camera: {
          id: props.camera.id,
          name: props.camera.name,
          personId: Number(event.target.value)
        }
      },
      refetchQueries: [
        {
          query: ALL_PERSONS_AND_CAMERAS_LIST
        }
      ]
    });
  };

  //   console.log(props);
  //   console.log(assignCamera);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssign = () => {
    assignCamera(variable);
    setOpen(false);
    // window.location.reload();
  };

  var data = props.person;

  function createData(name, id) {
    return {
      name,
      id
    };
  }

  for (let i = 0; i < data.length; i++) {
    rows[i] = createData(data[i].name, data[i].id);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Assign
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Choose user to assign</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Name</InputLabel>
              <Select
                native
                value={name}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option value="" />
                {rows.map(row => (
                  <option value={row.id} key={row.id}>
                    {row.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAssign} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
