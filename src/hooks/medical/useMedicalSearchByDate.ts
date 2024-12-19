import { getMedicalVisitsByMonth } from "@/service/medical";
import { MedicalVisitData } from "@/types/medical";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useMedicalSearchByDate(petId: string) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const { data: searchResults } = useQuery<MedicalVisitData, Error>({
    queryKey: ["medicalList", petId, selectedYear, selectedMonth],
    queryFn: () => getMedicalVisitsByMonth(petId, selectedYear, selectedMonth),
    enabled: !!selectedYear && !!selectedMonth && !!petId,
  });

  const handleSearch = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  return {
    searchResults,
    handleSearch,
  };
}
