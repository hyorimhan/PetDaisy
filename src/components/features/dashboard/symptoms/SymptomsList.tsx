import Link from "next/link";
import React from "react";

function SymptomsList() {
  return (
    <div>
      <div className="opacity-90 text-main-5 text-base font-light ">
        관찰 기록
      </div>
      <Link href={"/dashboard/symptomsWrite"}>관찰 기록 등록</Link>
      <div className="w-full h-[665px] p-3  bg-white rounded-lg shadow">
        <Link href={"/dashboard/symptomsDetail"}>
          <div className="w-full h-[65px] bg-main-1 rounded-lg">1</div>
        </Link>
      </div>
    </div>
  );
}

export default SymptomsList;