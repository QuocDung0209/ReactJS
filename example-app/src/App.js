import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppContainer from "./containers/AppContainer";
import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { StateProvider } from "./store.js";

const App = () => {
  return (
    <StateProvider>
      <React.Fragment>
        <Router>
          <CssBaseline />
          <MenuBar />
          <AppContainer />
        </Router>
      </React.Fragment>
    </StateProvider>
  );
};

export default App;
