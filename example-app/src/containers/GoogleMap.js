import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export const DEFAULT_CENTER = { lat: -34.397, lng: 150.644 };
const DEFAULT_ZOOM = 8;

const mapContainer = {
  height: "100%",
  width: "100%"
};

function Map(props) {
  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={"AIzaSyBX1z5nvjcjzyxSMT-QCVS3ERu6Y3iNSb0"}
      language="en"
      region="EN"
      version="weekly"
    >
      <GoogleMap
        id="example-map"
        mapContainerStyle={mapContainer}
        zoom={props.zoom || DEFAULT_ZOOM}
        center={
          { lat: props.latLng[0], lng: props.latLng[1] } || DEFAULT_CENTER
        }
        {...props}
      >
        {props.children}
      </GoogleMap>
    </LoadScript>
  );
}

Map.propTypes = {
  onClick: PropTypes.func
};

export default Map;
