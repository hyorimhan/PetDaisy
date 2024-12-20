import { getSymtomsByMonth } from "@/service/symptoms";
import { SymptomsData } from "@/types/symptoms";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useSymptomsSearchByDate(petId: string) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const { data: searchResults } = useQuery<SymptomsData, Error>({
    queryKey: ["symptomsList", petId, selectedYear, selectedMonth],
    queryFn: () => getSymtomsByMonth(petId, selectedYear, selectedMonth),
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
