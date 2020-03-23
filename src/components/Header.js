import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: 1300
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolBar: {
    backgroundColor: "#F1F1F1"
  },
  youtubeButton: {
    color: "red"
  }
}));

function Header(props) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        {!isMobile ? (
          ""
        ) : (
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => props.onChange(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <IconButton
          edge="start"
          className={classes.youtubeButton}
          aria-label="youtube"
        >
          <YouTubeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
