"use client";
import Button from "@/components/common/Button/Button";

function DetailAction({ visitId }: { visitId: string }) {
  const handleDeleteVisit = (visitId: string) => {
    // delete
  };
  return (
    <div className="flex flex-col gap-[10px] my-[30px]">
      <Button
        types="lg"
        bgColor="bg-yellow-5"
        content="수정하기"
        textColor="text-white"
        href={""}
      />
      <Button
        types="lg"
        bgColor="bg-gray-1"
        textColor="text-gray-3"
        content="삭제하기"
        onClick={() => handleDeleteVisit(visitId)}
      />
    </div>
  );
}

export default DetailAction;
