import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChart = (props) => {
  const {data} = props;
 


  const lineData = {
    labels: data.labels?.length > 0 ? data.labels : [],
    datasets: [
      {
        label: "Open",
        data: data.timeSeries?.length > 0 ? data.timeSeries.map((item)=> parseFloat(item['1. open'])) : [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Close",
        data: data.timeSeries?.length > 0 ? data.timeSeries.map((item)=> parseFloat(item['4. close'])) : [],
        fill: true,
        backgroundColor: "rgba(255, 0, 0 ,0.2)",
        borderColor: "rgba(255, 0, 0,1)"
      }
    ]
  }


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };


  return (
        <Line options={options} data={lineData} />
  );
}

export default LineChart;
