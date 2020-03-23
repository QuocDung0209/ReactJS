import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { GoogleMap, Marker } from "@react-google-maps/api";

export const DEFAULT_CENTER = { lat: -34.397, lng: 150.644 };
const DEFAULT_ZOOM = 8;

const mapContainer = {
  height: "100%",
  width: "100%"
};

const mapCenter = { lat: -34.397, lng: 150.644 };

function Map(props) {
  const [isShown, setIsShown] = useState(false);

  const changeIsShown = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown]);

  return (
    // <LoadScript
    //   id="script-loader"
    //   googleMapsApiKey="https://maps.googleapis.com/maps/api/js?key=AIzaSyASDJtmKN4B2oUdayaZzwQMPf5NU0a8LQg&region=GB&v=3.exp&libraries=geometry,drawing,places"
    //   {...props}
    // >
    <GoogleMap
      id="example-map"
      mapContainerStyle={mapContainer}
      zoom={props.zoom || DEFAULT_ZOOM}
      center={props.center || DEFAULT_CENTER}
      onClick={props.handleClick}
      {...props}
    >
      <Marker position={mapCenter} onClick={changeIsShown} />
    </GoogleMap>
    // </LoadScript>
  );
}

Map.propTypes = {
  onClick: PropTypes.func
};

export default Map;
