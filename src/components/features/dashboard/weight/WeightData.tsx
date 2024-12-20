import Card from "@/components/common/Card/Card";
import PaginateBtn from "@/components/common/paginate/PaginateBtn";
import usePagination from "@/hooks/paginate/usePagination";
import useDeleteMutation from "@/hooks/weight/useDeleteMutation";

import useGetWeight from "@/hooks/weight/useGetWeight";
import {
  weightChangeColor,
  formatWeightChange,
} from "@/utils/format/weightChange";
import React from "react";

function WeightData() {
  const { page, limit, onPageChange, currentPage } = usePagination();
  const { weightData } = useGetWeight(page, limit);
  const handleDelete = useDeleteMutation();

  return (
    <div className="pt-3">
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
              const weightChange = prevWeight
                ? +(weight.weight - prevWeight).toFixed(1)
                : 0;

              return (
                <div
                  key={weight.id}
                  className="grid grid-cols-3 pt-3 text-gray-4  text-center"
                >
                  <span>{weight.measured_at}</span>
                  <span>{weight.weight}kg</span>
                  <div className="flex justify-end items-center gap-2  pr-4 sm:pr-4 md:pr-14 lg:pr-14  ">
                    <div className={weightChangeColor(weightChange)}>
                      {formatWeightChange(weightChange)}
                    </div>
                    <button
                      onClick={() => handleDelete.handleDeleteWeight(weight.id)}
                    >
                      x
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <PaginateBtn
          pageCount={Math.ceil((weightData?.count ?? 0) / limit)}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Card>
    </div>
  );
}

export default WeightData;
