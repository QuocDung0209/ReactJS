import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
import { useMutation } from "@apollo/react-hooks";
import {
  UPDATE_CAMERA,
  ALL_PERSONS_AND_CAMERAS_LIST
} from "../services/queries";

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function CameraInfo(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [unassignCamera] = useMutation(UPDATE_CAMERA);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUnassign = () => {
    unassignCamera({
      variables: { camera: { id: props.camera.id, name: props.camera.name } },
      refetchQueries: [
        {
          query: ALL_PERSONS_AND_CAMERAS_LIST
        }
      ]
    });
  };

  return (
    <div>
      <Button color="primary" onClick={handleClick}>
        <CameraEnhanceIcon /> {props.camera.id}
      </Button>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary="Unassign" onClick={handleUnassign} />
        </StyledMenuItem>
        {/* <StyledMenuItem>
          <ListItemText primary="Tranfer" />
        </StyledMenuItem> */}
      </Menu>
    </div>
  );
}
