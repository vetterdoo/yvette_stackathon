import axios from "axios";
const TOKEN = "token";

const ADD_FAVORITE = "ADD_FAVORITE";

export const addFavoriteAction = (dogPark) => {
  return {
    type: ADD_FAVORITE,
    dogPark,
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
      dispatch(addFavoriteAction(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.dogPark];
    default:
      return state;
  }
};
