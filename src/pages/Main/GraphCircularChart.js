import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip, LabelList, Label, Bar } from 'recharts';

const data = [
  { name: '생활비', value: 31 },
  { name: '공과금', value: 51 },
  { name: '용돈', value: 18 },
  { name: '기타', value: 0 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const GraphCircularChart = () => {
  const total = data.reduce((acc, entry) => acc + entry.value, 0);
  return (
    <PieChart width={900} height={500}>
      <Pie
        data={data}
        dataKey="value"
        isAnimationActive={true}
        cx={180}
        cy={140}
        innerRadius={45}
        outerRadius={110}
        fill="#82ca9d"
        paddingAngle={5}
        label
      >
        <Label value="11월" position="center" fontSize={20} />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <LabelList dataKey="name" position="inside" />
      </Pie>
      <Label
        content={({ percent }) => `${(percent * total).toFixed(0)}%`}
        position="center"
        fontSize={20}
      />
      <Tooltip />
    </PieChart>
  );
};

export default GraphCircularChart;
