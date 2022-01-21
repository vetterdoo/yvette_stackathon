import axios from "axios";
import history from "../history";

const SET_DOG_PARKS = "SET_DOG_PARKS";

export const setDogParks = (dogParks) => {
  return {
    type: SET_DOG_PARKS,
    dogParks,
  };
};

export const fetchDogParks = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/dogParks");
      dispatch(setDogParks(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_DOG_PARKS:
      return action.dogParks;
    default:
      return state;
  }
}
