"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Chart({ data }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="mb-4 font-semibold">Clicks Over Time</h2>

      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}