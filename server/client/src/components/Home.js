import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchZone, fetchPlants } from "../actions";
import { withRouter } from 'react-router'
import { bindActionCreators } from "redux";
import Schedule from './Schedule';
import GardenBed from './GardenBed';
import { getZone, getPlants } from "../selectors"
import Grid from '@material-ui/core/Grid';

class Home extends Component {

  componentDidMount() {
    this.props.fetchPlants(); 
    this.props.fetchZone(27701);
  }

  render = () => {
    return (
      <div className="row" >
        <div className="col-md-6" style={{marginTop: '8px'}}>
        <GardenBed />
        </div>
        <div className="col-md-6" style={{marginTop: '8px'}}>
        <Schedule />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { zone: getZone(state), plants: getPlants(state) }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchZone, fetchPlants }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)); 