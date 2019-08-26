import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchZone, fetchPlants } from "../actions";
import { withRouter } from 'react-router'
import { bindActionCreators } from "redux";
import Schedule from './Schedule';
import GardenBed from './GardenBed';
import { getZone, getPlants } from "../selectors";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class Home extends Component {

  componentDidMount() {
    this.props.fetchPlants(); 
    this.props.fetchZone(27701);
  }

  render = () => {
    return (
      <div className="row" style={{alignItems: 'center'}}>
        <div className="col-md-6" style={{marginTop: '8px'}}>
          <div style={{marginBottom: '8px', textAlign:'center'}}><Typography variant="h6" paragraph> Your Garden </Typography></div>
        <GardenBed />
        </div>
        <div className="col-md-6" style={{marginTop: '8px', marginBottom: '4px'}}>
        <Paper style={{padding: '4px'}}><Schedule /></Paper>
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