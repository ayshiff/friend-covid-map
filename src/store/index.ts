import { combineReducers } from "redux";
import pointReducer from "./point.reducer";

export default combineReducers<any>({
  points: pointReducer,
});
