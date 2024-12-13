"use client";
import Card from "@/components/common/Card/Card";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import useGetSymptomsDetail from "@/hooks/symptoms/useGetSymptomsDetail";
import React from "react";

function SymptomDetail({ post_id }: Readonly<{ post_id: string }>) {
  const { symptomsDetail, isError, isPending } = useGetSymptomsDetail(post_id);
  return (
    <QueryStateHandler
      data={symptomsDetail}
      isError={isError}
      isPending={isPending}
    >
      <div className="opacity-90 py-7 text-main-5 text-base font-light ">
        관찰 기록
      </div>
      <Card>
        {symptomsDetail?.map((detail) => (
          <div
            key={detail.id}
            className="flex flex-col space-y-[10px] min-h-[300px]"
          >
            <span className="text-gray-3 text-xs">
              {detail.symptom_date
                .slice(2, 10)
                .replace("-", ".")
                .replace("-", ".")}
            </span>
            <span className="text-xl">{detail.title}</span>
            <span>{detail.content}</span>
          </div>
        ))}
      </Card>
    </QueryStateHandler>
  );
}

export default SymptomDetail;
