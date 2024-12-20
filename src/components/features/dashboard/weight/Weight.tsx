"use client";
import Card from "@/components/common/Card/Card";
import CardTitle from "@/components/common/Card/CardTitle";
import Chart from "./Chart";

function Weight() {
  return (
    <Card>
      <div className="h-[15.625rem] flex flex-col">
        <CardTitle title="몸무게 기록" link="/dashboard/weightList" />
        <div className="flex justify-center items-center flex-1 min-h-0">
          <Chart />
        </div>
      </div>
    </Card>
  );
}

export default Weight;
