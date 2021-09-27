import React from "react";
import {
    Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis,
    YAxis
} from "recharts";
import "./Chart.scss";


function Chart(props) {
  const { DATA } = props;
  return (
    <div className="chart">
      <div className="chart__title">Revenue Analytics</div>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={DATA}>
          <XAxis dataKey="name" stroke="#555"></XAxis>
          <YAxis></YAxis>
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="New user" strokeWidth="3px"></Line>
          <Line
            type="monotone"
            dataKey="Booking number"
            strokeWidth="3px"
            stroke="chartreuse"
          ></Line>
          <Line
            type="monotone"
            dataKey="Revenue per month"
            strokeWidth="3px"
            stroke="cyan"
          ></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
