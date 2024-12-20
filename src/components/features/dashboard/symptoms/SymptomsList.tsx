"use client";
import Card from "@/components/common/Card/Card";
import Empty from "@/components/common/Empty/Empty";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import Input from "@/components/common/Input/Input";

import PaginateBtn from "@/components/common/paginate/PaginateBtn";
import usePagination from "@/hooks/paginate/usePagination";
import useGetSymptoms from "@/hooks/symptoms/useGetSymptoms";
import { useSymptomsSearchByDate } from "@/hooks/symptoms/useSymptomsSearchByDate";
import { usePetStore } from "@/zustand/usePetStore";
import Link from "next/link";
<<<<<<< HEAD
import { useMemo } from "react";
=======
import SearchByMonth from "../medical/list/SearchByMonth";
>>>>>>> 0d80a60357851bb018502e257192deadf0baa086

function SymptomsList() {
  const petId = usePetStore((state) => state.petId) as string;
  const { page, limit, onPageChange, currentPage } = usePagination();
  const { symptomsData, isPending, isError } = useGetSymptoms(page, limit);

<<<<<<< HEAD
  const currentYear = new Date().getFullYear();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const startYear = 2024;

  const years = useMemo(() => {
    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index
    );
  }, [currentYear]);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0")),
    []
  );
=======
  const { searchResults, handleSearch } = useSymptomsSearchByDate(petId);

  const displayData = searchResults?.data || symptomsData?.data || [];

>>>>>>> 0d80a60357851bb018502e257192deadf0baa086
  return (
    <QueryStateHandler
      data={symptomsData}
      isPending={isPending}
      isError={isError}
    >
      <div className="pt-3 ">
<<<<<<< HEAD
        <div className="flex p-2 space-x-1">
          <select
            defaultValue={currentYear}
            className="p-2 pr-8 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>

          <select
            defaultValue={currentMonth}
            className="p-2 pr-8 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
=======
        <SearchByMonth onSearch={handleSearch} />
>>>>>>> 0d80a60357851bb018502e257192deadf0baa086
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
