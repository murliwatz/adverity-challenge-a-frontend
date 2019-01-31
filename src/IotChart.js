import React, { Component } from 'react';

import {Line} from 'react-chartjs-2';

class IotChart extends Component {

  getChartData() {

    let datasets = [];
    let labels = [];


    for(let kwData of this.props.data) {
      let data = [];
      for(let d of kwData.values) {
        data.push({
          x: d.timestamp.substr(0, 10),
          y: d.interest
        });
        labels.push(d.timestamp.substr(0, 10));
      }
      let color = this.getRandomColor();
      datasets.push({
        label: kwData.keyword,
        pointStyle: 'line',
        backgroundColor: color,
        borderColor: color,
        data: data,
        fill: false
      })
    }

    labels.sort(function(a, b) {
      return (a < b) ? -1 : ((a > b) ? 1 : 0);
    });

    return {
      labels: labels,
      datasets: datasets
    };
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getChartOptions() {
    return {
      responsive: true,
      title: {
        display: true,
        text: 'Interest over time Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Interest'
          }
        }]
      }
    }
  }

  render() {

    return (
        <Line data={this.getChartData()} options={this.getChartOptions()} />
    );
  }
}

export default IotChart;
