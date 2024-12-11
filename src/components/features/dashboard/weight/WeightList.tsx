"use client";
import Chart from "./Chart";
import Button from "@/components/common/Button/Button";
import { usePetStore } from "@/zustand/usePetStore";
import ReactPaginate from "react-paginate";
import useGetWeight from "@/hooks/chart/useGetChart";
import usePagination from "@/hooks/paginate/usePagination";
import Loading from "@/components/common/Loading/Loading";

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
  const { page, limit, handlePageClick, currentPage } = usePagination();
  const { weightData, isLoading } = useGetWeight(petId ?? "", page, limit);

  if (isLoading) {
    return <Loading />;
  }

  const formatWeightChange = (change: number) => {
    if (change === 0) return "";
    if (change > 0) return `+${change}`;
    return change;
  };

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
          {weightData?.data.map((weight, index) => {
            const prevWeight = weightData.data[index + 1]?.weight;
            let weightChange = prevWeight
              ? +(weight.weight - prevWeight).toFixed(1)
              : 0;
            return (
              <div
                key={weight.id}
                className="flex justify-around pt-3 text-gray-4 opacity-90 "
              >
                <span>{weight.measured_at}</span>
                <span>{weight.weight}kg</span>
                <span>{formatWeightChange(weightChange)}</span>
              </div>
            );
          })}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={Math.ceil((weightData?.count ?? 0) / limit)}
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
