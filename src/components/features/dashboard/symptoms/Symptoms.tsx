import Link from "next/link";
import React from "react";

function Symptoms() {
  return (
    <div className="w-full h-[266px] p-2  bg-white rounded-lg shadow">
      <div className="w-full h-[12.5rem]">
        <div className="flex justify-between">
          <span className="opacity-90 text-[#7e6af0] text-base font-light ">
            관찰 기록
          </span>
          <Link href={"/dashboard/symptomsList"}>자세히 보기</Link>
        </div>
        <div className="w-full h-[65px] bg-violet-50 rounded-lg"></div>
      </div>
    </div>
  );
}

export default Symptoms;
