import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const GraphBarChart = () => {
  return (
    <BarChart
      width={580}
      height={280}
      data={data}
      margin={{
        top: 25,
        right: 10,
        left: 40,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="수입" fill="#8884d8" />
      <Bar dataKey="지출" fill="#82ca9d" />
    </BarChart>
  );
};

export default GraphBarChart;

const data = [
  {
    name: '1월',
    수입: 3000000,
    지출: 502000,
  },
  {
    name: '2월',
    수입: 3500000,
    지출: 502000,
  },
  {
    name: '3월',
    수입: 3000000,
    지출: 502000,
  },
  {
    name: '4월',
    수입: 3000000,
    지출: 502000,
  },
  {
    name: '5월',
    수입: 4500000,
    지출: 502000,
  },
  {
    name: '6월',
    수입: 4500000,
    지출: 502000,
  },
  {
    name: '7월',
    수입: 4500000,
    지출: 502000,
  },
  {
    name: '8월',
    수입: 4500000,
    지출: 502000,
  },
  {
    name: '9월',
    수입: 4500000,
    지출: 502000,
  },
  {
    name: '10월',
    수입: 4500000,
    지출: 502000,
  },
  {
    name: '11월',
    수입: 5000000,
    지출: 246000,
  },
  {
    name: '12월',
    수입: 4500000,
    지출: 0,
  },
];
