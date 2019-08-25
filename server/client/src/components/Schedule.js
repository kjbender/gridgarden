import React, { Component } from 'react';
import { connect } from "react-redux";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);

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
          text: 'by zone'
        },
        xAxis: {
          categories: ['Tomato', 'Corn', 'Beans', 'Onion', 'Carrot', 'Broccoli',
            'Chili', 'Eggplant', 'Peas', 'Pepper', 'Radish', 'Garlic', 'Pumpkin',
            'Lettuce', 'Potato', 'Red onion', 'Cucumber']
        },

        yAxis: {
          title: {
            text: ''
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
          data: [
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
          ]
        },
        {
          colorByPoint: true,
          name: 'Months',
          data: [
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
          ]
        }]
      }

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

export default connect()(Schedule);
