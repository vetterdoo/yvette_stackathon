import axios from "axios";
import history from "../history";

const SET_DOG_PARKS = "SET_DOG_PARKS";
const ADD_DOG_PARKS = "ADD_DOG_PARKS";

export const setDogParks = (dogParks) => {
  return {
    type: SET_DOG_PARKS,
    dogParks,
  };
};

export const addDogParksAction = (dogParks) => {
  return {
    type: ADD_DOG_PARKS,
    dogParks,
  };
};

export const fetchDogParks = (location) => {
  return async (dispatch) => {
    try {
      if (!location) {
        location = "10019";
      }
      const { data } = await axios.get(
        `/api/dogParks/yelp/${location}`
      );
      dispatch(setDogParks(data));
    } catch (err) {
      console.log(err);
    }
  };
};


export const addDogParks = (location, dogParks) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/dogParks/yelp/${location}`, dogParks);
      dispatch(addDogParksAction(data));
    } catch (err) {
      console.log(err);
    }
  };
};


export default function (state = [], action) {
  switch (action.type) {
    case SET_DOG_PARKS:
      return action.dogParks;
    case ADD_DOG_PARKS:
      return [...state, action.dogParks]
    default:
      return state;
  }
}
