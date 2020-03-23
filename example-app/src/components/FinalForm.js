import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useStateValue } from "../store";

const useStyles = makeStyles({
  list: {
    position: "fixed"
  },
  label: {
    flex: 0.08,
    fontSize: 18
  },
  input: {
    backgroundColor: "green",
    padding: "8px 16px",
    marginTop: 5,
    marginLeft: 185,
    fontWeight: "bold",
    color: "white"
  },
  error: {
    marginLeft: 5,
    color: "red",
    fontWeight: "bold"
  },
  textField: {
    marginLeft: 55
  }
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const FinalForm = () => {
  const [open, setOpen] = useState(false);
  const store = useStateValue();

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = value => {
    store[1]({ type: "changeInfo", newInfo: value });
  };

  const onSubmit = async values => {
    await sleep(1000);
    setOpen(true);
  };

  const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.age) {
      errors.age = "Required";
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, submitting, values }) => (
        <div>
          <form onSubmit={handleSubmit}>
            <List className={classes.list}>
              <ListItem>
                <ListItemText primary="Name" className={classes.label} />
                <Field name="name">
                  {props => (
                    <div className={classes.textField}>
                      <TextField {...props.input} placeholder="Name*" />
                      {props.meta.touched && props.meta.error && (
                        <span className={classes.error}>
                          {props.meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>
              </ListItem>
              <ListItem>
                <ListItemText primary="Age" className={classes.label} />
                <Field name="age">
                  {props => (
                    <div className={classes.textField}>
                      <TextField
                        {...props.input}
                        type="number"
                        placeholder="Age*"
                      />
                      {props.meta.touched && props.meta.error && (
                        <span className={classes.error}>
                          {props.meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>
              </ListItem>
              <ListItem>
                <input
                  type="submit"
                  value="Save"
                  disabled={submitting}
                  className={classes.input}
                />
              </ListItem>
            </List>
          </form>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Save this information?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="primary"
                style={{ textDecoration: "none", color: "blue" }}
              >
                No
              </Button>
              <Button
                onClick={() => handleYes(values)}
                color="primary"
                autoFocus
                type="submit"
              >
                <Link
                  to={{ pathname: "/" }}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Yes
                </Link>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    />
  );
};

export default FinalForm;
