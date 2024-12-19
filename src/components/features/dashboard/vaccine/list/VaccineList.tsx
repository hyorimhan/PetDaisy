"use client";
import Card from "@/components/common/Card/Card";
import PaginateBtn from "@/components/common/paginate/PaginateBtn";
import { Vaccinations } from "@/types/vaccine";
import VaccineCard from "./VaccineCard";

interface VaccineListProps {
  vaccinations: Vaccinations;
  limit: number;
  onPageChange: (selectedPage: { selected: number }) => void;
  currentPage: number;
  count: number;
}
function VaccineList({
  vaccinations,
  limit,
  onPageChange,
  currentPage,
  count,
}: VaccineListProps) {
  return (
    <Card>
      <ul className="flex flex-col gap-2">
        {vaccinations.length === 0 && (
          <p className="text-gray-4 text-center py-[120px]">
            예방 접종 내역이 없습니다
          </p>
        )}
        {vaccinations &&
          vaccinations.map((vaccination) => (
            <li key={vaccination.id}>
              <VaccineCard vaccination={vaccination} />
            </li>
          ))}
      </ul>
      <PaginateBtn
        pageCount={Math.ceil((count ?? 0) / limit)}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </Card>
  );
}

export default VaccineList;
