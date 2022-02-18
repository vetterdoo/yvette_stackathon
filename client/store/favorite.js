import axios from "axios";
const TOKEN = "token";

const ADD_FAVORITE = "ADD_FAVORITE";
const DELETE_FAVORITE = "DELETE_FAVORITE";
const FIND_FAVORITE = "FIND_FAVORITE";
const SET_FAVORITES = "SET_FAVORITES";

export const addFavoriteAction = (dogPark) => {
  return {
    type: ADD_FAVORITE,
    dogPark,
  };
};

export const deleteFavoriteAction = (dogPark) => {
  return {
    type: DELETE_FAVORITE,
    dogPark,
  };
};

export const findFavoriteAction = (dogPark) => {
  return {
    type: FIND_FAVORITE,
    dogPark,
  };
};

export const setFavorites = (dogParks) => {
  return {
    type: SET_FAVORITES,
    dogParks,
  };
};

export const addFavorite = (dogParkId, dogPark) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      
      const { data } = await axios.post(`/api/dogParks/${dogParkId}`, dogPark, {
        headers: {
          authorization: token,
        },
      });

      console.log(data);
      dispatch(addFavoriteAction(data));
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const deleteFavorite = (dogParkId) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/dogParks/${dogParkId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(deleteFavoriteAction(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const findFavorite = (dogParkId) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/dogParks/${dogParkId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(findFavoriteAction(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchFavorites = () => {
  const token = window.localStorage.getItem(TOKEN);

  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/dogParks", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setFavorites(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.dogPark];
    case DELETE_FAVORITE:
      return state.filter((dogPark) => dogPark.id !== action.dogPark.id);
    case FIND_FAVORITE:
      return action.dogPark;
    case SET_FAVORITES:
      return action.dogParks;
    default:
      return state;
  }
};
