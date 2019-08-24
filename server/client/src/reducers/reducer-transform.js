import { FETCH_TRANSFORMED_PLOT } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TRANSFORMED_PLOT: {
      //console.log('reducer', action.payload); 
      return action.payload.transformedGarden;
    }
    default:
      return state;
  }
} 
