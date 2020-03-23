import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import { routes } from "../routes.js";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles({
  item: {
    borderBottom: "solid 1px black",
    "&:first-child": {
      borderTop: "solid 1px black"
    }
  },

  menuLink: {
    textDecoration: "none",
    color: "black"
  },

  list: {
    width: 200,
    paddingTop: 64
  },

  listMobile: {
    width: 200,
    paddingTop: 56
  }
});

const SideBar = props => {
  const classes = useStyles();

  const renderList = routes => {
    return (
      <List className={isMobile ? classes.listMobile : classes.list}>
        {routes.map(route => {
          if (route.type === "menu") {
            return (
              <NavLink
                exact={route.exact}
                to={route.path}
                className={classes.menuLink}
                activeStyle={{
                  backgroundColor: "#04d10e",
                  float: "left",
                  width: 200,
                  color: "white"
                }}
                key={route.name}
              >
                <ListItem className={classes.item} button key={route.name}>
                  <ListItemText primary={route.name} />
                </ListItem>
              </NavLink>
            );
          }
          return null;
        })}
      </List>
    );
  };

  return (
    <Drawer
      open={props.open}
      onClose={() => props.onChange(false)}
      variant={isMobile ? "temporary" : "permanent"}
    >
      {renderList(routes)}
    </Drawer>
  );
};

export default SideBar;
