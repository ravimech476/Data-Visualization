// // // import React, { PureComponent } from "react";
// // // import {
// // //   LineChart,
// // //   Line,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   Legend,
// // //   ResponsiveContainer,
// // // } from "recharts";

// // // const datas = [
// // //   {
// // //     name: "Page A",
// // //     uv: 4000,
// // //     pv: 2400,
// // //     amt: 2400,
// // //   },
// // //   {
// // //     name: "Page B",
// // //     uv: 3000,
// // //     pv: 1398,
// // //     amt: 2210,
// // //   },
// // //   {
// // //     name: "Page C",
// // //     uv: 2000,
// // //     pv: 9800,
// // //     amt: 2290,
// // //   },
// // //   {
// // //     name: "Page D",
// // //     uv: 2780,
// // //     pv: 3908,
// // //     amt: 2000,
// // //   },
// // //   {
// // //     name: "Page E",
// // //     uv: 1890,
// // //     pv: 4800,
// // //     amt: 2181,
// // //   },
// // //   {
// // //     name: "Page F",
// // //     uv: 2390,
// // //     pv: 3800,
// // //     amt: 2500,
// // //   },
// // //   {
// // //     name: "Page G",
// // //     uv: 3490,
// // //     pv: 4300,
// // //     amt: 2100,
// // //   },
// // // ];

// // // const Linechart = ({ data = [], legend = ["value"], label = "label" }) => {
// // //   return (
// // //     <ResponsiveContainer width="100%" height="100%">
// // //       <LineChart data={data}>
// // //         <CartesianGrid strokeDasharray="3 3" />
// // //         <XAxis dataKey="name" />
// // //         <YAxis />
// // //         <Tooltip />
// // //         <Legend />
// // //         <Line
// // //           type="monotone"
// // //           dataKey={legend}
// // //           stroke="#8884d8"
// // //           activeDot={{ r: 8 }}
// // //         />
// // //         <Line type="monotone" dataKey={legend} stroke="#82ca9d" />
// // //       </LineChart>
// // //     </ResponsiveContainer>
// // //   );
// // // };

// // // export default Linechart;
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Linechart = ({ data = [] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="Movie_Name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Votes"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Linechart;

// import * as React from "react";
// import { LineChart } from "@mui/x-charts/LineChart";

// const BasicLineChart = ({ data }) => {
//   const xAxisData = data?.map((item) => item?.Movie_Name);
//   const seriesData = data?.map((item) => parseFloat(item?.Votes));

//   return (
//     <LineChart
//       xAxis={[{ data: xAxisData }]}
//       series={[
//         {
//           data: seriesData,
//         },
//       ]}
//       width={500}
//       height={300}
//     />
//   );
// };

// export default BasicLineChart;
