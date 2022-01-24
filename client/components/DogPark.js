import React from "react";
import { connect } from "react-redux";
import { fetchDogPark } from "../store/dogPark";
import { addFavorite, deleteFavorite } from "../store/favorite";

export class DogPark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogParkId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.loadDogPark(this.props.match.params.dogParkId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({
        location: this.props.dogParkId || "",
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
    await this.props.loadDogPark(this.state.dogParkId);
  }

  render() {
    const dogPark = this.props.dogPark;
    return (
      <div id="dog-park">
        <h1>Dog Park Info</h1>
        <h2>{dogPark.name}</h2>
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
    loadDogPark: (dogParkId) => dispatch(fetchDogPark(dogParkId)),
    addFavorite: (dogParkId, dogPark) =>
      dispatch(addFavorite(dogParkId, dogPark)),
    deleteFavorite: (dogParkId) => dispatch(deleteFavorite(dogParkId)),
  };
};

export default connect(mapState, mapDispatch)(DogPark);
