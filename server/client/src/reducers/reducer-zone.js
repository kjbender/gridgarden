import { FETCH_ZONE } from '../actions/types';
// {"zone": "7b", "coordinates": {"lat": 35.98, "lon": -78.91}, 
// "temperature_range": "5 to 10"}

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ZONE: {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
}
 