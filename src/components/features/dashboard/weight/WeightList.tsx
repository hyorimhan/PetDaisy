"use client";
import Chart from "./Chart";
import Button from "@/components/common/Button/Button";
import useGetWeight from "@/hooks/weight/useGetWeight";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import Card from "@/components/common/Card/Card";
import WeightData from "./WeightData";

function WeightList() {
  const { weightData, isPending, isError } = useGetWeight();

  return (
    <QueryStateHandler
      data={weightData}
      isPending={isPending}
      isError={isError}
    >
      <div className="text-main-5 py-[27px]">몸무게 기록</div>
      <Button
        content="몸무게 등록"
        types="addInfo"
        href={"/dashboard/weightWrite"}
      />
      <div className="pt-3">
        <Card>
          <div className="w-full h-[250px] ">
            <Chart />
          </div>
        </Card>
      </div>
      <WeightData />
    </QueryStateHandler>
  );
}

export default WeightList;
