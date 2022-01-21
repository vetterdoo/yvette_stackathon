import React from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { fetchDogParks } from "../store/dogParks";

/**
 * COMPONENT
 */
export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDogParks();
  }

  render() {
    return (
      <div>
        <h1>This is my map:</h1>
        <div className="mapStyles">
          <Map
            google={this.props.google}
            zoom={5}
            initialCenter={{ lat: 39.8097343, lng: -98.5556199 }}
          >
            {this.props.dogParks.map((dogPark) => {
              return (
                  <Marker
                    key={dogPark.id}
                    position={{ lat: dogPark.lat, lng: dogPark.lng }}
                  />
              );
            })}
          </Map>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    dogParks: state.dogParks,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchDogParks: () => dispatch(fetchDogParks()),
  };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBvyAAOXQoiTUFUrbrexYjyBRPvLPHmYPs",
})(connect(mapState, mapDispatch)(MapContainer));
