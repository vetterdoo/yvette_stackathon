import axios from "axios";
import history from "../history";

const SET_DOG_PARK = "SET_DOG_PARK";

export const setDogPark = (dogPark) => {
  return {
    type: SET_DOG_PARK,
    dogPark,
  };
};


export const fetchDogPark = (dogParkId) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(
          `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/${dogParkId}`,
          {
            headers: {
              Authorization: `Bearer R2a38N5AUyLRbPzr2sGvZz21cBHgx8hVr5mBkU020IHzSHUEmkEnse5jbCx9T6RsjuiMGU3cDerA4JDduLXzUYoNSsJQR58LxDBOYpQ6kzyhG_SVek-hGiG6TjXrYXYx`,
            },
          }
        );
        dispatch(setDogPark(data));
      } catch (err) {
        console.log(err);
      }
    };
  };
  
  export default function (state = {}, action) {
    switch (action.type) {
      case SET_DOG_PARK:
        return action.dogPark;
      default:
        return state;
    }
  }
  