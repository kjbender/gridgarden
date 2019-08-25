import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchZone, fetchPlants } from "../actions";
import { withRouter } from 'react-router'
import { bindActionCreators } from "redux";
import Schedule from './Schedule';
import GardenBed from './GardenBed';
import { getZone, getPlants } from "../selectors"

class Home extends Component {

  componentDidMount() {
    this.props.fetchPlants(); 
    this.props.fetchZone(27701);
  }

  render = () => {
    return (
      <Fragment>
        <GardenBed />
        <Schedule />
      </Fragment>
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