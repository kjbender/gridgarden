import { FETCH_TRANSFORMED_PLOT } from '../actions/types';

export default function (state = {transformedGarden: [], conflictArray: []}, action) {
  switch (action.type) {
    case FETCH_TRANSFORMED_PLOT: {
      //console.log('reducer', action.payload); 
      return Object.assign({}, state, action.payload); 
    }
    default:
      return state;
  }
} 
