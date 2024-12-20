"use client";

import Empty from "@/components/common/Empty/Empty";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import useGetWeight from "@/hooks/weight/useGetWeight";
import { Line, LineChart, ResponsiveContainer, XAxis } from "recharts";

function Chart() {
  const { weightData, isPending, isError } = useGetWeight();

  const recentData = weightData?.data
    .slice(-10)
    .reverse()
    .map((weight) => ({
      date: weight.measured_at.slice(5, 10),
      weight: weight.weight,
    }));

  if (recentData?.length === 0) {
    return <Empty content="몸무게를 등록해주세요." />;
  }
  return (
    <QueryStateHandler
      data={weightData}
      isPending={isPending}
      isError={isError}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={recentData}
          margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" dy={10} tick={{ fontSize: 12 }} interval={0} />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            label={{
              position: "top",
              fill: "#8884d8",
              fontSize: 12,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </QueryStateHandler>
  );
}

export default Chart;
