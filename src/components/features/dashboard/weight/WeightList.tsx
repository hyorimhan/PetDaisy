"use client";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Link from "next/link";
import React from "react";
import Chart from "./Chart";

function WeightList() {
  return (
    <div>
      <span className="text-main-4">몸무게 기록</span>
      <ImageUploadButton content="몸무게 등록" />
      <Link href={"/dashboard/weightWrite"}>몸무게 등록</Link>
      <div className="w-full h-[12.5rem]">
        <Chart />
      </div>
      <div className="w-full h-[23.6875rem] bg-white rounded-lg shadow">
        <div className="flex justify-around pt-3 ">
          <span>날짜</span>
          <span>몸무게</span>
          <span>증감량</span>
        </div>
      </div>
    </div>
  );
}

export default WeightList;
