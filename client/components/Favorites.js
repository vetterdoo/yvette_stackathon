import React from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { fetchFavorites } from "../store/favorite";
import { Link } from "react-router-dom";
import history from "../history";

export class Favorites extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFavorites();
  }

  render() {
    //const  centerCoordinates  = this.props.favorites[0] === undefined ? { lat: 40.7128, lng: -73.935242 } : { lat: this.props.favorites[0].coordinates.latitude, lng: this.props.favorites[0].coordinates.longitude };
    return (
      <div>
        <h1>Favorites</h1>
        <div className="mapStyles">
          <ol>
            {this.props.dogParks.map((dogPark) => {
              return <li key={dogPark.id}>{dogPark.name}</li>;
            })}
          </ol>
          <Map
            google={this.props.google}
            zoom={4}
            center={{ lat: 37.0902, lng: -95.7129 }}
            //{centerCoordinates}
          >
            {this.props.dogParks.map((dogPark, index) => {
              return (
                <Marker
                  key={index}
                  label={String(this.props.dogParks.indexOf(dogPark) + 1)}
                  position={{
                    lat: dogPark.lat,
                    lng: dogPark.lng,
                  }}
                  // onClick={() => {
                  //   window.open(`/map/${dogPark.id}`);
                  // }}
                  onClick={() => {
                    // console.log(this.props);
                    //this.props.addDogParks(this.props.location, dogPark);
                    history.push({
                      pathname: `/map/${dogPark.id}`,
                      state: {
                        thisPark: dogPark,
                      },
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
    dogParks: state.favorite,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchFavorites: () => dispatch(fetchFavorites()),
  };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBvyAAOXQoiTUFUrbrexYjyBRPvLPHmYPs",
})(connect(mapState, mapDispatch)(Favorites));
