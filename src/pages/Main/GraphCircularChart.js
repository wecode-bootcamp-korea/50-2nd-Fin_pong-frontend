import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, LabelList } from 'recharts';

const GraphCircularChart = ({ data }) => {
  const transformedData = [];
  // 월 데이터 변환 로직
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  // 현재
  useEffect(() => {
    const interval = setInterval(() => {
      const newMonth = getCurrentMonth();
      if (newMonth !== currentMonth) {
        setCurrentMonth(newMonth);
      }
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [currentMonth]);

  function getCurrentMonth() {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    return month;
  }

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
  console.log('total', total);

  return (
    <PieChart width={900} height={500}>
      <Pie
        data={transformedData}
        dataKey="value"
        isAnimationActive={true}
        cx={250}
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
        <LabelList
          dataKey="name"
          position="outside"
          content={(props) => {
            const { value, index } = props;
            const percent = data[index].spending;

            return (
              <g>
                <rect
                  x={465}
                  y={196 + index * 28}
                  width={20}
                  height={15}
                  fill={COLORS[index % COLORS.length]}
                />
                <text
                  x={500}
                  y={210 + index * 28}
                  fill={COLORS[index % COLORS.length]}
                  fontWeight="bold"
                  fontSize={18}
                >
                  {value} ({percent})
                </text>
                <text
                  x={255}
                  y={155}
                  textAnchor="middle"
                  fill="#333"
                  fontSize={24}
                  fontWeight="bold"
                >
                  {currentMonth}
                </text>
              </g>
            );
          }}
        />
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default GraphCircularChart;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
