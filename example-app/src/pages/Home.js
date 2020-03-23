import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Map from "../containers/GoogleMap";
import Grid from "@material-ui/core/Grid";
import InfoTable from "../components/InfoTable";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useStateValue } from "../store";


const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },

  welcome: {
    height: 120,
    backgroundColor: "white",
    margin: "auto"
  },

  gridItem: {
    height: 550,
    backgroundColor: "white",
    marginTop: 40,
    margin: "auto"
  }
});

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

function Home() {
  const [latLng, setLatLng] = useState([-34.397, 150.644]);
  const [isShown, setIsShown] = useState(true);
  const [info, setInfo] = useState("");
  const store = useStateValue();

  const changeIsShown = () => setIsShown(!isShown);

  const classes = useStyles();

  const onView = value => {
    setLatLng(value.position);
    setInfo(value.name);
    setIsShown(true);
  };

  if (store[0].info) {
    var name = store[0].info.name;
    var age = store[0].info.age;
  }

  // let query = useQuery();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={11} xs={11} className={classes.welcome}>
          <h1>Welcome{name && age ? `: ${name} (${age})` : ""}</h1>
          <div>
            <NavLink to="/info">Input infomation</NavLink>
          </div>
        </Grid>
        <Grid item lg={5} xs={11} className={classes.gridItem}>
          <Map latLng={latLng}>
            <Marker
              position={{ lat: latLng[0], lng: latLng[1] }}
              visible={isShown}
              onClick={changeIsShown}
            />
            {!isShown && (
              <InfoWindow position={{ lat: latLng[0], lng: latLng[1] }}>
                <div>
                  <h5>
                    ({latLng[0]}, {latLng[1]})
                  </h5>
                  <h2>{info}</h2>
                </div>
              </InfoWindow>
            )}
          </Map>
        </Grid>
        <Grid item lg={5} xs={11} className={classes.gridItem}>
          <InfoTable onView={onView} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
