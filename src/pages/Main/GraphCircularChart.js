import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip, LabelList, Label, Bar } from 'recharts';

const GraphCircularChart = ({ data }) => {
  const transformedData = [];

  data.forEach((item) => {
    let value = 0;
    if (item.spending !== '0%') {
      const percentage = parseInt(item.spending);
      value = Math.round((percentage / 100) * 100);
    }

    transformedData.push({
      name: item.category,
      value: value,
    });
  });

  const total = data.reduce((acc, entry) => acc + entry.value, 0);
  return (
    <PieChart width={900} height={500}>
      <Pie
        data={transformedData}
        dataKey="value"
        isAnimationActive={true}
        cx={300}
        cy={140}
        innerRadius={45}
        outerRadius={110}
        fill="#82ca9d"
        paddingAngle={5}
        label
      >
        {transformedData.map((entry, index) => (
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
