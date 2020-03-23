import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import { routes } from "../routes";
import { isMobile } from "react-device-detect";

//  ApolloProvider is a component to make a configured Apollo Client instance available throughout a React component tree
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../services/client";

const useStyles = makeStyles({
  paper: {
    width: "calc(100% - 200px)",
    height: "100%",
    position: "fixed",
    left: 200,
    paddingTop: 80,
    overflow: "scroll"
  },

  paperMobile: {
    width: "100%",
    height: "100%",
    position: "fixed",
    paddingTop: 72,
    overflow: "scroll"
  }
});

const AppContainer = () => {
  const classes = useStyles();

  var result = null;

  if (routes.length > 0) {
    result = routes.map(route => (
      <Route
        exact={route.exact}
        path={route.path}
        component={route.main}
        key={route.name}
      />
    ));
  }

  return (
    <ApolloProvider client={client}>
      <Paper className={isMobile ? classes.paperMobile : classes.paper} square>
        <Switch>{result}</Switch>
      </Paper>
    </ApolloProvider>
  );
};

export default AppContainer;
