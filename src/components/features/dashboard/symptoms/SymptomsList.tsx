"use client";
import Card from "@/components/common/Card/Card";
import Empty from "@/components/common/Empty/Empty";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";

import PaginateBtn from "@/components/common/paginate/PaginateBtn";
import usePagination from "@/hooks/paginate/usePagination";
import useGetSymptoms from "@/hooks/symptoms/useGetSymptoms";
import { useSymptomsSearchByDate } from "@/hooks/symptoms/useSymptomsSearchByDate";
import { usePetStore } from "@/zustand/usePetStore";
import Link from "next/link";
import SearchByMonth from "../medical/list/SearchByMonth";

function SymptomsList() {
  const petId = usePetStore((state) => state.petId) as string;
  const { page, limit, onPageChange, currentPage } = usePagination();
  const { symptomsData, isPending, isError } = useGetSymptoms(page, limit);

  const { searchResults, handleSearch } = useSymptomsSearchByDate(petId);

  const displayData = searchResults?.data || symptomsData?.data || [];

  return (
    <QueryStateHandler
      data={symptomsData}
      isPending={isPending}
      isError={isError}
    >
      <div className="pt-3 ">
        <SearchByMonth onSearch={handleSearch} />
        <Card>
          <div>
            {!displayData || displayData.length === 0 ? (
              <Empty content="관찰 기록을 등록해주세요." />
            ) : (
              displayData.map((symptom) => (
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
