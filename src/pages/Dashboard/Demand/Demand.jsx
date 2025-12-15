import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Demand = () => {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["serviceDemand"],
    queryFn: async () => {
      const res = await fetch("https://xdecor.vercel.app/analytics/service-demand");
      if (!res.ok) throw new Error("Failed to fetch service demand");
      return res.json();
    },
  });

  if (isLoading)
    return <p className="text-center font-bold text-xl">Loading chart...</p>;

  if (error)
    return <p className="text-center font-bold text-xl text-red-500">{error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Service Demand Chart
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="serviceName" // match your backend key
            angle={-30} // tilt labels for readability
            textAnchor="end"
            interval={0} // show all labels
            height={60} // increase space for tilted labels
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#4f46e5" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Demand;
