"use client";
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
      <div className="pt-3 ">
        <Card>
          {symptomsData?.data.map((symptom) => (
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
          ))}
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
