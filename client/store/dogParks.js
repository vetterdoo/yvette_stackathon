import axios from "axios";
import history from "../history";

const SET_DOG_PARKS = "SET_DOG_PARKS";

export const setDogParks = (dogParks) => {
  return {
    type: SET_DOG_PARKS,
    dogParks,
  };
};

// export const fetchDogParks = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get("/api/dogParks");
//       dispatch(setDogParks(data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export default function (state = [], action) {
//   switch (action.type) {
//     case SET_DOG_PARKS:
//       return action.dogParks;
//     default:
//       return state;
//   }
// }

export const fetchDogParks = (location) => {
  return async (dispatch) => {
    try {
      if (!location) {
        location = "10019";
      }
      const { data } = await axios.get(
        `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?term=dog_park&location=${location}&limit=1`,
        {
          headers: {
            Authorization: `Bearer R2a38N5AUyLRbPzr2sGvZz21cBHgx8hVr5mBkU020IHzSHUEmkEnse5jbCx9T6RsjuiMGU3cDerA4JDduLXzUYoNSsJQR58LxDBOYpQ6kzyhG_SVek-hGiG6TjXrYXYx`,
          },
        }
      );

      console.log(data.businesses);
      dispatch(setDogParks(data.businesses));
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
