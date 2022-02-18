import React from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { fetchDogParks, addDogParks } from "../store/dogParks";
//import { Link } from "react-router-dom";
//import { fetchSinglePark } from "../store/singlePark";
import history from "../history"

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
    //await this.props.addDogParks(this.state.location, this.props.dogParks);
  }

  render() {
    const { location } = this.state;
    const { handleSubmit, handleChange } = this;

    const  centerCoordinates  = this.props.dogParks[0] === undefined ? { lat: 40.7128, lng: -73.935242 } : { lat: this.props.dogParks[0].coordinates.latitude, lng: this.props.dogParks[0].coordinates.longitude };
    return (
      <div>
        <h3>Welcome, {this.props.username}</h3>
        <h1>Dog Parks</h1>
        <form id="location-input" onSubmit={handleSubmit}>
          <label htmlFor="location"> Zip Code:</label>
          <input name="location" onChange={handleChange} 
          value={location} 
          />
          <button type="submit">Search</button>
        </form>
        <div className="mapStyles">
          <Map
            google={this.props.google}
            zoom={10}
            center={centerCoordinates}
          >

            {this.props.dogParks.map((dogPark, index) => {
              return (
                <Marker
                  key={dogPark.id}
                  position={{
                    lat: dogPark.coordinates.latitude,
                    lng: dogPark.coordinates.longitude,
                  }}
                  onClick={() => {
                    history.push({
                      pathname: `/map/${dogPark.id}`,
                      state: {
                        thisPark: dogPark,
                        num: index}
                    });
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
    username: state.auth.username,
    dogParks: state.dogParks,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchDogParks: (location) => dispatch(fetchDogParks(location)),
    addDogParks: (location, dogParks) => dispatch(addDogParks(location, dogParks)),

    //fetchSinglePark: (dogPark) => dispatch(fetchSinglePark(dogPark))
  };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBvyAAOXQoiTUFUrbrexYjyBRPvLPHmYPs",
})(connect(mapState, mapDispatch)(MapContainer));
