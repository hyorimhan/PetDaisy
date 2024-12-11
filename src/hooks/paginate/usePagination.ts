"use client";
import React, { useState } from "react";

export function usePagination() {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const page = currentPage + 1;

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return {
    page,
    limit,
    handlePageClick,
    currentPage,
  };
}

export default usePagination;
