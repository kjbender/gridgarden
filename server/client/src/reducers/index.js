import { combineReducers } from "redux";

import ZoneReducer from "./reducer-zone";
import TransformReducer from "./reducer-transform";
import PlantsReducer from "./reducer-plants";

const rootReducer = combineReducers({
  zone: ZoneReducer,
  transformedPlot: TransformReducer,
  plants: PlantsReducer
});

export default rootReducer; 