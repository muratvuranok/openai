import { combineReducers } from "@reduxjs/toolkit";
import storySlice from "../features/stories/storySlice";

const rootReducer = combineReducers({
  story: storySlice,
});

export default rootReducer;
