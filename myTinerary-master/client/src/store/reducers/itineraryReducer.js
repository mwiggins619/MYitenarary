const initialState = {
  itineraries: [],
  err: "",
  favorites: [],
  favoriteitineraries: [],
};

//you had some issues acting the payload to pass data from your action to your reducer
//I changed a bit the naming too so it makes more sense
function itineraryReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ITINERARIES_SUCCESS":
      return { ...state, itineraries: action.payload, err: "" };

    case "FETCH_ITINERARIES_ERROR":
      console.log("FETCH_ITINERARIES_ERROR", action);
      return { ...state, err: action.payload };
    case "ADD_ITINERARY":
      return { ...state };
    case "ADD_ITINERARY_FAVORITE":
      console.log("ADD_ITINERARY_FAVORITE");
      return { ...state };

    case "DELETE_ITINERARY_FAVORITE":
      console.log("DELETE_ITINERARY_FAVORITE");
      return { ...state };
    case "FETCH_PROFILE_ITINERARY":
      console.log("FETCH_PROFILE_ITINERARY", action.payload);
      return { ...state, favoriteitineraries: action.payload };

    case "ADD_COMMENTS":
      console.log("ADD_COMMENTS", action);

      return { ...state };
    case "DELETE_COMMENTS":
      return { ...state };

    default:
      return state;
  }
}
export default itineraryReducer;
