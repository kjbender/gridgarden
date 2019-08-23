import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchZone } from "../actions";
import { withRouter } from 'react-router'
import { bindActionCreators } from "redux";
import Garden from './Garden';

class Home extends Component {

  handleFetchZone = () => {
    this.props.fetchZone(27701); 
  };

  render = () => {
    return (
      <div>
        <button
          onClick={this.handleFetchZone}
          className="get-zone-button"
        >get zone by zipcode</button>
        <p>tray</p>
        <Garden />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchZone }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Home)); 