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
import TransferWithinAStationTwoToneIcon from "@material-ui/icons/TransferWithinAStationTwoTone";
import ForwardIcon from "@material-ui/icons/Forward";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_CAMERA, ALL_PERSONS_LIST } from "../services/queries";

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

export default function TransferButton(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [camId, setCamId] = React.useState("");
  const [personId, setPersonId] = React.useState("");
  const [transferCam] = useMutation(UPDATE_CAMERA);

  var cameras = props.cameras.cameras;

  const handleChangeID = event => {
    setCamId(Number(event.target.value) || "");
  };

  const handleChangeName = event => {
    setPersonId(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTransfer = () => {
    let camName = "";
    for (var cam of cameras) {
      if (cam.id === camId) {
        camName = cam.name;
        break;
      }
    }
    transferCam({
      variables: {
        camera: {
          id: camId,
          name: camName,
          personId: personId
        }
      },
      refetchQueries: [
        {
          query: ALL_PERSONS_LIST
        }
      ]
    });
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        disabled={cameras.length === 0 ? true : false}
      >
        <TransferWithinAStationTwoToneIcon />
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Choose camera to transfer for user</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Cameras</InputLabel>
              <Select
                native
                value={camId}
                onChange={handleChangeID}
                input={<Input id="demo-dialog-native" />}
              >
                <option value="" />
                {cameras.map(camera => (
                  <option key={camera.id} value={camera.id}>
                    {camera.id}
                  </option>
                ))}
              </Select>
            </FormControl>
            <ForwardIcon style={{ width: 50, marginTop: 30 }} />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Users</InputLabel>
              <Select
                native
                value={personId}
                onChange={handleChangeName}
                input={<Input id="demo-dialog-native" />}
              >
                <option value="" />
                {props.persons.map(person => {
                  return person.name === props.cameras.name ? null : (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTransfer} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
