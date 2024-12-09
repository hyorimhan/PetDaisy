"use client";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  Line,
} from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,

    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,

    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,

    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,

    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,

    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,

    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,

    amt: 2100,
  },
];

function Chart() {
  const recentData = data.slice(-5);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={recentData}
        margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="name"
          dy={10} // x축 레이블을 아래로 이동
          tick={{ fontSize: 12 }} // 폰트 크기 설정
          interval={0}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          label={{
            position: "top",
            fill: "#8884d8",
            fontSize: 12,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
