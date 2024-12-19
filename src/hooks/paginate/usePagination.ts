"use client";
import { useState } from "react";

export function usePagination() {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const page = currentPage + 1;

  const onPageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return {
    page,
    limit,
    onPageChange,
    currentPage,
  };
}

export default usePagination;
