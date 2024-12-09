"use client";
import React from "react";
import Chart from "./Chart";
import Button from "@/components/common/Button/Button";

function WeightList() {
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
      <div className="w-full h-[23.6875rem] bg-white rounded-lg shadow">
        <div className="flex justify-around pt-3 text-main-5 opacity-90 ">
          <span>날짜</span>
          <span>몸무게</span>
          <span>증감량</span>
        </div>
      </div>
    </div>
  );
}

export default WeightList;
