import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itineraryReducer from "./itineraryReducer";
import usersReducers from "./usersReducers";
const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itineraryReducer,
  users: usersReducers
});
export default rootReducer;
