import React, { Component } from 'react';
import { connect } from "react-redux";
import { getPlantedList } from "../selectors"
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
var _ = require('lodash');

require('highcharts/highcharts-more')(Highcharts);

const plantCategories = ['Tomato', 'Corn', 'Beans', 'Onion', 'Carrot', 'Broccoli',
'Chili', 'Eggplant', 'Peas', 'Pepper', 'Radish', 'Garlic', 'Pumpkin',
'Lettuce', 'Potato', 'Red onion', 'Cucumber'];

const series1data = [
  [1.5, 8.5],
  [3.5, 7.5],
  [2.5, 9],
  [1.5, 7.5],
  [1.5, 5],
  [1, 4.5],
  [1.5, 8.5],
  [2, 8],
  [1, 4],
  [1.5, 8.5],
  [0.5, 8],
  [7.5, 10.5],
  [3, 10],
  [1.5, 4.5],
  [3.5, 7.5],
  [1.5, 7.5],
  [3.5, 7.5]
]; 

const series2data = [
  [],
  [],
  [],
  [],
  [6.5, 9.5],
  [6.5, 10],
  [],
  [],
  [7, 10],
  [],
  [],
  [],
  [],
  [6.5, 9.5],
  [],
  [],
  []
]; 

class Schedule extends Component {
  constructor() {
    super()
    this.state = {
      chartOptions: {
        chart: {
          type: 'columnrange',
          inverted: true
        },
        title: {
          text: 'Planting Schedule'
        },
        subtitle: {
          text: 'Hardiness zone 7b'
        },
        credits: { enabled: false }, 
        tooltip: {
          shared: true,
          formatter: function () {
            return this.x;
          }
        },
        xAxis: {
          categories: [ ]
        },
        yAxis: {
          min: 0,
          max: 11,
          title: {
            text: 'Time range from planting to harvest'
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        plotOptions: {
          columnrange: {
            dataLabels: {
              enabled: false
            }
          },
          series: {
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          colorByPoint: true,
          name: 'Months',
          data: [ ]
        },
        {
          colorByPoint: true,
          name: 'Months',
          data: [ ]
        }]
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (!(_.isEqual(this.props.plantedList, prevProps.plantedList))) {
      let newCategories = this.props.plantedList.map((plant) => plantCategories[plant - 1]);
      let newSeries1Data = this.props.plantedList.map((plant) => series1data[plant - 1]);
      let newSeries2Data = this.props.plantedList.map((plant) => series2data[plant - 1]);

      this.setState({
        chartOptions: { 
          xAxis: {
            categories: newCategories
          }, 
          series: [{
            colorByPoint: true,
            name: 'Months',
            data: newSeries1Data
          },
          {
            colorByPoint: true,
            name: 'Months',
            data: newSeries2Data
          }]
        }
      });
    }
  }

  render() {
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.chartOptions}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    plantedList: getPlantedList(state)
  };
}

export default connect(mapStateToProps)(Schedule);
