"use client";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import useGetSymptomsDetail from "@/hooks/symptoms/useGetSymptomsDetail";

import SymptomDetailData from "./SymptomDetailData";

function SymptomDetail({ postId }: Readonly<{ postId: string }>) {
  const { symptomsDetail, isError, isPending } = useGetSymptomsDetail(postId);

  return (
    <QueryStateHandler
      data={symptomsDetail}
      isError={isError}
      isPending={isPending}
    >
      <div className="opacity-90 py-7 text-main-5 text-base font-light ">
        관찰 기록
      </div>
      <SymptomDetailData postId={postId} />
    </QueryStateHandler>
  );
}

export default SymptomDetail;
