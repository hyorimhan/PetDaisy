"use client";
import { getWeightList } from "@/service/weight";
import { usePetStore } from "@/zustand/usePetStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  Line,
} from "recharts";
import { weightDataType, weightTableType } from "./WeightList";

function Chart() {
  const { petId } = usePetStore();
  const { data: weightData, isLoading } = useQuery<weightDataType>({
    queryKey: ["weightData", petId],
    queryFn: () => {
      if (!petId) throw new Error();
      return getWeightList(petId);
    },
    enabled: !!petId,
  });
  if (isLoading) {
    return "로딩중";
  }
  const recentData = weightData?.data.slice(-10).map((weight) => ({
    date: weight.measured_at.slice(5, 10),
    weight: weight.weight,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={recentData}
        margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
          dy={10} // x축 레이블을 아래로 이동
          tick={{ fontSize: 12 }} // 폰트 크기 설정
          interval={0}
        />
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
  );
}

export default Chart;
