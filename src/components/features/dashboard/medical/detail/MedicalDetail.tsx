"use client";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import { useGetMedicalDetail } from "@/hooks/medical/useGetMedicalDetail";
import Detail from "./Detail";

function MedicalDetail({ visitId }: { visitId: string }) {
  const { details, isPending, isError } = useGetMedicalDetail(visitId);

  return (
    <QueryStateHandler
      data={details}
      isPending={isPending}
      isError={isError}
      wrapper={false}
    >
      {details && <Detail details={details} />}
    </QueryStateHandler>
  );
}

export default MedicalDetail;
