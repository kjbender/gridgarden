import { FETCH_PLANTS } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PLANTS: {
      return Object.assign({}, state, action.payload.plants);
    }
    default:
      return state;
  }
}