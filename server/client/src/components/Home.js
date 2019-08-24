import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchZone, fetchPlants } from "../actions";
import { withRouter } from 'react-router'
import { bindActionCreators } from "redux";
//import Garden from './Garden';
import GardenBed from './GardenBed';

class Home extends Component {

  componentDidMount() {
    this.props.fetchPlants(); 
    this.props.fetchZone(27701);
  }

  render = () => {
    return (
      <Fragment>
        <GardenBed />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return { zone: state.zone, plants: state.plants }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchZone, fetchPlants }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)); 