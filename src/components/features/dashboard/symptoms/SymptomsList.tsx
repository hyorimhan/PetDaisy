"use client";
import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";

import PaginateBtn from "@/components/common/paginate/PaginateBtn";
import usePagination from "@/hooks/paginate/usePagination";
import useGetSymptoms from "@/hooks/symptoms/useGetSymptoms";
import Link from "next/link";

function SymptomsList() {
  const { page, limit, onPageChange, currentPage } = usePagination();
  const { symptomsData, isPending, isError } = useGetSymptoms(page, limit);

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
      <div className="pt-3 ">
        <Card>
          <div className="h-[600px]">
            {!symptomsData?.data || symptomsData.data.length === 0 ? (
              <Card>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6 py-[120px]">
                    <p className="text-lg text-gray-4">
                      관찰 기록을 등록해주세요
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              symptomsData?.data.map((symptom) => (
                <div className="bg-main-1 p-3 rounded-lg mb-2" key={symptom.id}>
                  <Link
                    href={`/dashboard/symptomsDetail/${symptom.id}`}
                    className="flex flex-col"
                  >
                    <span className="text-gray-3 text-xs">
                      {symptom.symptom_date}
                    </span>
                    <span className="mt-2">{symptom.title}</span>
                  </Link>
                </div>
              ))
            )}
          </div>
          <PaginateBtn
            pageCount={Math.ceil((symptomsData?.count ?? 0) / limit)}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </Card>
      </div>
    </QueryStateHandler>
  );
}

export default SymptomsList;
