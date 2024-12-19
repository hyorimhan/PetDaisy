"use client";
import Card from "@/components/common/Card/Card";
import Empty from "@/components/common/Empty/Empty";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import PaginateBtn from "@/components/common/paginate/PaginateBtn";
import { useGetMedicalVisitLists } from "@/hooks/medical/useGetMedicaVisitlLists";
import { useMedicalSearchByDate } from "@/hooks/medical/useMedicalSearchByDate";
import usePagination from "@/hooks/paginate/usePagination";
import { MedicalVisits } from "@/types/medical";
import { usePetStore } from "@/zustand/usePetStore";
import MedicalCard from "./MedicalCard";
import SearchByMonth from "./SearchByMonth";
function MedicalList() {
  const petId = usePetStore((state) => state.petId) as string;
  const { page, limit, onPageChange, currentPage } = usePagination();
  const { medicalLists, isPending, isError } = useGetMedicalVisitLists(
    petId,
    page,
    limit
  );

  const { searchResults, handleSearch } = useMedicalSearchByDate(petId);

  const displayData = (searchResults ||
    medicalLists?.data ||
    []) as MedicalVisits;

  return (
    <QueryStateHandler
      data={medicalLists}
      isPending={isPending}
      isError={isError}
    >
      <SearchByMonth onSearch={handleSearch} />
      <Card>
        {!displayData.length && <Empty content="진료 기록 정보가 없습니다." />}
        <ul className="flex flex-col gap-2">
          {displayData.map((list) => (
            <li key={list.id}>
              <MedicalCard list={list} />
            </li>
          ))}
        </ul>
        <PaginateBtn
          pageCount={Math.ceil((medicalLists?.count ?? 0) / limit)}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Card>
    </QueryStateHandler>
  );
}

export default MedicalList;
