import React from "react";
import { connect } from "react-redux";
import { fetchDogPark } from "../store/dogPark";

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
    const dogPark = this.props.dogPark
    
    return (
      <div id="dog-park">
        <h1>Dog Park Info</h1>
        <h2>{dogPark.name}</h2>
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
  };
};

export default connect(mapState, mapDispatch)(DogPark);
