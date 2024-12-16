"use client";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import useGetSymptomsDetail from "@/hooks/symptoms/useGetSymptomsDetail";
import React from "react";
import SymptomsWrite from "./SymptomsWrite";

function SymptomsEdit({ post_id }: Readonly<{ post_id: string }>) {
  const { symptomsDetail, isPending, isError } = useGetSymptomsDetail(post_id);
  console.log(symptomsDetail);
  return (
    <QueryStateHandler
      data={symptomsDetail}
      isError={isError}
      isPending={isPending}
    >
      <SymptomsWrite isEdit={true} defaultValue={symptomsDetail?.[0]} />
    </QueryStateHandler>
  );
}

export default SymptomsEdit;
