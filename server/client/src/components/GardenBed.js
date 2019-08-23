import React, { Component } from 'react';
import { fetchTransformedPlot } from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import shortid from "shortid";

import onion from '../icons/onion.svg'
import corn from '../icons/corn.svg'
import carrot from '../icons/carrot.svg'
import tomato from '../icons/tomato.svg'
import beans from '../icons/beans.svg'
const ICONS = ['', tomato, corn, beans, onion, carrot]; 

const getTrayItems = number =>
  Array.from({ length: number }, (v, k) => k).map(k => ({
    _id: shortid.generate(),
    plantId: k,
    label: `plant-${k}`
  }));

class GardenBed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
      tray: getTrayItems(5)
    };
  }

  componentDidMount() {
    this.props.fetchTransformedPlot([[0, 0], [0, 0]])
  }


  render() {
    return (
      <div></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    transformedPlot: state.transformedPlot,
    plants: state.plants
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTransformedPlot }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GardenBed); 
