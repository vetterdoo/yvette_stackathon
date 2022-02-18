import React from "react";
import { connect } from "react-redux";
import { setDogParks } from "../store/dogParks";
import { addFavorite, deleteFavorite } from "../store/favorite";

export class DogPark extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dogPark = this.props.location.state.thisPark;
   //console.log(dogPark);

    return (
      <div id="dog-park">
        <h1>Dog Park Info</h1>
        <h2>{dogPark.name}</h2>
        <p>{dogPark.location.display_address[0]}</p>
        <p>{dogPark.location.display_address[1]}</p>
        <button
          className="favorite"
          onClick={() => {
            this.props.addFavorite(dogPark.id, dogPark);   
          }}
        >
          Favorite
        </button>

        <button
          className="unfavorite"
          onClick={() => {
            this.props.deleteFavorite(dogPark.id);
          }}
        >
          Unfavorite
        </button>
        <div className="picture">
          <img className="picSrc" src={dogPark.image_url} />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    dogPark: state.dogPark,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addFavorite: (dogParkId, dogPark) =>
    dispatch(addFavorite(dogParkId, dogPark)),
    deleteFavorite: (dogParkId) => dispatch(deleteFavorite(dogParkId)),
  };
};

export default connect(mapState, mapDispatch)(DogPark);
