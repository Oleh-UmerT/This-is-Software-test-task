import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  timeArr: string[];
  tempArr: number[];
}

const TemperatureChart: React.FC<Props> = ({ timeArr, tempArr }) => {
  const data = timeArr.map((time: string, index: number) => ({
    time: time.split("T")[1],
    temperature: tempArr[index],
  }));

  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
    </LineChart>
  );
};

export default TemperatureChart;
