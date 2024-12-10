import Button from "@/components/common/Button/Button";
import Link from "next/link";

function SymptomsList() {
  return (
    <div>
      <div className="opacity-90 py-[1.6875rem] text-main-5 text-base font-light ">
        관찰 기록
      </div>
      <Button
        content="관찰 기록 등록"
        types="addInfo"
        href={"/dashboard/symptomsWrite"}
      />

      <div className="w-full h-[665px] p-3 mt-3 bg-white rounded-lg shadow">
        <Link href={"/dashboard/symptomsDetail"}>
          <div className="w-full h-[65px] bg-main-1 rounded-lg">1</div>
        </Link>
      </div>
    </div>
  );
}

export default SymptomsList;
