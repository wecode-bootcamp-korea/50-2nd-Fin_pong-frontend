import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: '생활비', value: 31 },
  { name: '공과금', value: 51 },
  { name: '용돈', value: 18 },
  { name: '기타', value: 0 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const GraphCircularChart = () => {
  return (
    <PieChart width={900} height={500}>
      <Pie
        data={data}
        dataKey="value"
        isAnimationActive={true}
        cx={120}
        cy={140}
        innerRadius={55}
        outerRadius={90}
        fill="#82ca9d"
        paddingAngle={5}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default GraphCircularChart;
