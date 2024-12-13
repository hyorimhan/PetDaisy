"use client";
import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import useGetSymptoms from "@/hooks/symptoms/useGetSymptoms";
import Link from "next/link";

function SymptomsList() {
  const { symptomsData, isPending, isError } = useGetSymptoms();
  console.log("로딩 상태:", isPending);
  console.log("에러 상태:", isError);
  console.log("데이터:", symptomsData);
  return (
    <QueryStateHandler
      data={symptomsData}
      isPending={isPending}
      isError={isError}
    >
      <div className="opacity-90 py-[1.6875rem] text-main-5 text-base font-light">
        관찰 기록
      </div>
      <Button
        content="관찰 기록 등록"
        types="addInfo"
        href={"/dashboard/symptomsWrite"}
      />

      <Card>
        <div>
          {symptomsData?.map((symptom) => (
            <Link
              href={`/dashboard/symptomsDetail/${symptom.id}`}
              key={symptom.id}
            >
              {symptom.title}
            </Link>
          ))}
        </div>
        {/* <Link href={"/dashboard/symptomsDetail"}>
          <div className="w-full h-[65px] bg-main-1 rounded-lg">1</div>
        </Link> */}
      </Card>
    </QueryStateHandler>
  );
}

export default SymptomsList;
