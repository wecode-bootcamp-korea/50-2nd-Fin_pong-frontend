import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

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

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.split(' ')[1]}
      </text>
    </g>
  );
};

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/bar-chart-with-min-height-3ilfq';

  render() {
    return (
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="수입" fill="#8884d8" minPointSize={5}>
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="지출" fill="#82ca9d" minPointSize={10} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
