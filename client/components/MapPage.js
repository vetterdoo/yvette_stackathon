import React from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper } from "google-maps-react";

/**
 * COMPONENT
 */
export class MapContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>This is my map:</h1>
        <div className = "mapStyles">
          <Map
            google={this.props.google}
            zoom={5}
            initialCenter={{ lat: 39.8097343, lng: -98.5556199 }}
          />
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

export default GoogleApiWrapper({
  apiKey: "AIzaSyBvyAAOXQoiTUFUrbrexYjyBRPvLPHmYPs",
})(MapContainer);
