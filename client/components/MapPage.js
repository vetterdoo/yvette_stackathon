import React from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { fetchDogParks } from "../store/dogParks";
import {ReactHover} from "react-hover"

/**
 * COMPONENT
//  */
export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchDogParks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setState({
        location: this.props.location || "",
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    await this.props.fetchDogParks(this.state.location);
  }

  render() {
    const { location } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <h1>Dog Parks</h1>
        <form id="location-input" onSubmit={handleSubmit}>
          <label htmlFor="location"> Zip Code:</label>
          <input name="location" onChange={handleChange} value={location} />
          <button type="submit">Search</button>
        </form>
        <div className="mapStyles">
          <Map
            google={this.props.google}
            zoom={10}
            initialCenter={{ lat: 40.7128, lng: -73.935242 }}
            //initialCenter={{ lat: this.props.dogPark[0].coordinates.latitude, lng: this.props.dogPark[0].coordinates.longitude }}
          >
            <Marker
              position={{ lat: 40.7128, lng: -73.935242 }}
              onClick={() => {
                alert("Clicked the Marker!");
              }}
              onMouseOver = { () => {

              }}
            />

            {this.props.dogParks.map((dogPark) => {
              return (
                <Marker
                  key={dogPark.id}
                  position={{
                    lat: dogPark.coordinates.latitude,
                    lng: dogPark.coordinates.longitude,
                  }}
                  onClick={() => {
                    alert("Clicked the Marker!");
                  }}
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
    fetchDogParks: (location) => dispatch(fetchDogParks(location)),
  };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBvyAAOXQoiTUFUrbrexYjyBRPvLPHmYPs",
})(connect(mapState, mapDispatch)(MapContainer));
