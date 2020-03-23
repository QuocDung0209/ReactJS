import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import TextField from "@material-ui/core/TextField";
import { Form, Field } from "react-final-form";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_CAMERA, ALL_CAMERAS_LIST } from "../services/queries";

export default function TransferButton(props) {
  const [open, setOpen] = React.useState(false);
  const [createCam] = useMutation(CREATE_CAMERA);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = values => {
    createCam({
      variables: {
        camera: {
          id: values.id,
          name: values.name,
          personId: values.personId
        }
      },
      refetchQueries: [
        {
          query: ALL_CAMERAS_LIST
        }
      ]
    });
    setOpen(false);
    // window.location.reload();
  };

  const validate = values => {
    const errors = {};
    var cameras = props.cameras;
    var persons = props.persons;

    if (!values.id) {
      errors.id = "Required!";
    } else if (Number(values.id) < 1000000) {
      errors.id = "ID must be at least 7 digits!";
    }

    if (!values.name) errors.name = "Required!";

    for (let i = 0; i < cameras.length; i++) {
      if (Number(values.id) === cameras[i].id) {
        errors.id = "Camera ID has existed!";
      }
      if (values.name === cameras[i].name)
        errors.name = "Camera name has existed!";
    }

    let count = 0;
    for (let i = 0; i < persons.length; i++) {
      if (Number(values.personId) === persons[i].id) count++;
    }

    if (values.personId)
      if (count === 0) errors.personId = "PersonID is not exist!";

    return errors;
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ backgroundColor: "white" }}>
        <AddAPhotoIcon />
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create Camera</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Field name="id">
                    {props => (
                      <div>
                        <TextField label="ID" {...props.input} type="number" />
                        {props.meta.touched && props.meta.error && (
                          <div style={{ color: "red" }}>{props.meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <Field name="name">
                    {props => (
                      <div>
                        <TextField label="Name" {...props.input} />
                        {props.meta.touched && props.meta.error && (
                          <div style={{ color: "red" }}>{props.meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <Field name="personId">
                    {props => (
                      <div>
                        <TextField
                          label="PersonID"
                          {...props.input}
                          type="number"
                        />
                        {props.meta.touched && props.meta.error && (
                          <div style={{ color: "red" }}>{props.meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Ok
                  </Button>
                </DialogActions>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
