"use client";
import Chart from "./Chart";
import Button from "@/components/common/Button/Button";
import { usePetStore } from "@/zustand/usePetStore";
import useGetWeight from "@/hooks/chart/useGetChart";
import usePagination from "@/hooks/paginate/usePagination";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import Card from "@/components/common/Card/Card";
import useDeleteMutation from "@/hooks/weight/useDeleteMutation";
import PaginateBtn from "@/components/common/paginate/PaginateBtn";

export type weightTableType = {
  id: string;
  pet_id: string;
  weight: number;
  measured_at: string;
};

export type weightDataType = {
  data: weightTableType[];
  count: number;
  page: number;
  limit: number;
};
function WeightList() {
  const { petId } = usePetStore();
  const { page, limit, onPageChange, currentPage } = usePagination();
  const { weightData, isPending, isError } = useGetWeight(
    petId ?? "",
    page,
    limit
  );
  const deleteMutation = useDeleteMutation();

  const formatWeightChange = (change: number) => {
    if (change === 0) return "변화없음";
    if (change > 0) return `+${change}kg`;
    return `${change}kg`;
  };

  const weightChangeColor = (change: number) => {
    if (change === 0) return "text-gray-400";
    if (change > 0) return "text-red-500";
    return "text-blue-5";
  };

  return (
    <QueryStateHandler
      data={weightData}
      isPending={isPending}
      isError={isError}
    >
      <div className="text-main-5 py-[1.6875rem]">몸무게 기록</div>
      <Button
        content="몸무게 등록"
        types="addInfo"
        href={"/dashboard/weightWrite"}
      />
      <div className="w-full h-[15.625rem] py-3">
        <Chart />
      </div>
      <Card>
        <div className="min-h-[350px]">
          <div className="grid grid-cols-3 text-main-5 pt-3 text-center">
            <span>날짜</span>
            <span>몸무게</span>
            <span>증감량</span>
          </div>
          <div>
            {weightData?.data.map((weight, index) => {
              const prevWeight = weightData.data[index + 1]?.weight;
              let weightChange = prevWeight
                ? +(weight.weight - prevWeight).toFixed(1)
                : 0;
              return (
                <div
                  key={weight.id}
                  className="grid grid-cols-3 pt-3 text-gray-4 opacity-90 text-center"
                >
                  <span>{weight.measured_at}</span>
                  <span>{weight.weight}kg</span>
                  <div className="flex justify-end items-center gap-2 pr-14">
                    <span className={weightChangeColor(weightChange)}>
                      {formatWeightChange(weightChange)}
                    </span>
                    <button onClick={() => deleteMutation.mutate(weight.id)}>
                      x
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      <PaginateBtn
        pageCount={Math.ceil((weightData?.count ?? 0) / limit)}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </QueryStateHandler>
  );
}

export default WeightList;
