import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const color = ["#c41d7f", "#08979c", "#531dab", "#389e0d", "#d46b08"];

const formatYAxis = (value) => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  return value;
};

const Barchart = ({ data = [], legend = ["value"], label = "label" }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        // maxWidth: "800px",
        margin: "auto",
      }}
    >
      <ResponsiveContainer width="100%" height={"100%"}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={label} />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip />
          <Legend />
          {legend?.map((_, index) => (
            // eslint-disable-next-line react/jsx-key
            <Bar key={index} dataKey={legend?.[index]} fill={color[index]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
