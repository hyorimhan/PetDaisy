"use client";
import React, { useState } from "react";
import Chart from "./Chart";
import Button from "@/components/common/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { usePetStore } from "@/zustand/usePetStore";
import { getWeightList } from "@/service/weight";
import ReactPaginate from "react-paginate";

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
  const limit = 10;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const page = currentPage + 1;
  const { data: weightData, isLoading } = useQuery<weightDataType>({
    queryKey: ["weightData", petId],
    queryFn: () => {
      if (!petId) throw new Error();
      return getWeightList(petId, page, limit);
    },
    enabled: !!petId,
  });
  if (isLoading) {
    return "로딩중";
  }
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil((weightData?.count ?? 0) / limit);

  return (
    <div>
      <div className="text-main-5 py-[1.6875rem]">몸무게 기록</div>
      <Button
        content="몸무게 등록"
        types="addInfo"
        href={"/dashboard/weightWrite"}
      />
      <div className="w-full h-[12.5rem] py-3">
        <Chart />
      </div>
      <div className="w-full h-full bg-white rounded-lg shadow">
        <div className="flex justify-around pt-3 text-main-5 opacity-90 ">
          <span>날짜</span>
          <span>몸무게</span>
          <span>증감량</span>
        </div>
        <div>
          {weightData?.data.map((weight) => (
            <div
              key={weight.id}
              className="flex justify-around pt-3 text-gray-4 opacity-90 "
            >
              <span>{weight.measured_at}</span>
              <span>{weight.weight}kg</span>
              <span></span>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center space-x-3 text-sm mt-10"}
        previousLinkClassName={"text-black focus:outline-none"}
        nextLinkClassName={"text-black   focus:outline-none "}
        pageLinkClassName={
          "text-black   focus:outline-none focus:text-custom-green-700"
        }
        breakLinkClassName={"page-link"}
        disabledLinkClassName={"focus:text-gray cursor-not-allowed"}
      />
    </div>
  );
}

export default WeightList;
