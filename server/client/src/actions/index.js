import axios from "axios";
import { FETCH_ZONE, FETCH_TRANSFORMED_PLOT, FETCH_PLANTS } from './types';

export const fetchZone = (zipcode) => dispatch => {
  axios.get(`https://cors-anywhere.herokuapp.com/http://phzmapi.org/${zipcode}.json`)
    .then(function (response) {
      dispatch({ type: FETCH_ZONE, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchTransformedPlot = (data) => dispatch => {
  //console.log('action', data);
  axios.post('/api/plot', data)
    .then(function (response) {
      dispatch({ type: FETCH_TRANSFORMED_PLOT, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchPlants = () => dispatch => {
  axios.get('/api/plants')
    .then(function (response) {
      dispatch({ type: FETCH_PLANTS, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
}
