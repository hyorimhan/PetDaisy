"use client";
import Link from "next/link";
import Chart from "./Chart";

function Weight() {
  return (
    <div className="w-full h-[18.75rem]  px-3 pt-[2.4375rem]  bg-white rounded-lg shadow">
      <div className="w-full h-[12.5rem]">
        <div className="flex justify-between">
          <span className="opacity-90 text-[#7e6af0] text-base font-light ">
            몸무게 기록
          </span>
          <Link href={"/dashboard/weightList"}>자세히 보기</Link>
        </div>
        <Chart />
      </div>
    </div>
  );
}

export default Weight;
