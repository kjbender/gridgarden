import { combineReducers } from "redux";

import ZoneReducer from "./reducer-zone";
import TransformReducer from "./reducer-transform";

const rootReducer = combineReducers({
  zone: ZoneReducer,
  transformedPlot: TransformReducer
});

export default rootReducer; 