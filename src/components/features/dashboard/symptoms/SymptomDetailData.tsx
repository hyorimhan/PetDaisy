import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import useDeleteSymptoms from "@/hooks/symptoms/useDeleteSymptoms";
import useGetSymptomsDetail from "@/hooks/symptoms/useGetSymptomsDetail";
import useModalStore from "@/zustand/useModalStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SymptomDetailData({ postId }: { postId: string }) {
  const { symptomsDetail } = useGetSymptomsDetail(postId);
  const { openModal } = useModalStore();
  const handleDelete = useDeleteSymptoms();
  return (
    <>
      {symptomsDetail?.map((detail) => {
        const imageUrls = detail.images ? JSON.parse(detail.images) : [];

        return (
          <div key={detail.id}>
            <Card>
              <div className="flex flex-col space-y-[10px] min-h-[300px]">
                <span className="text-gray-3 text-xs">
                  {detail.symptom_date
                    .slice(2, 10)
                    .replace("-", ".")
                    .replace("-", ".")}
                </span>
                <span className="text-xl">{detail.title}</span>
                <span>{detail.content}</span>
              </div>
            </Card>
            <div className="grid grid-cols-3   mt-4">
              {imageUrls.map((imgUrl: string) => (
                <Image
                  key={imgUrl.split("/").pop()}
                  src={imgUrl}
                  alt={`symptom-image`}
                  width={300}
                  height={300}
                  className="w-full h-[200px]"
                  onClick={() =>
                    openModal({
                      content: (
                        <Image
                          src={imgUrl}
                          alt="detailImg"
                          width={1000}
                          height={1000}
                          className="w-[350px] h-[350px]"
                        />
                      ),
                      onConfirm: undefined,
                      onCancel: undefined,
                    })
                  }
                />
              ))}
            </div>
            <div className="space-y-2">
              <Button
                types="lg"
                bgColor="bg-yellow-5"
                textColor="text-white"
                content="수정하기"
                href={`/dashboard/symptomsEdit/${detail.id}`}
              />
              <Button
                types="lg"
                bgColor="bg-gray-1"
                textColor="text-gray-3"
                content="삭제하기"
                onClick={() => handleDelete.handleDeleteSymptoms(detail.id)}
              />
              <Button
                types="lg"
                bgColor="bg-gray-1"
                textColor="text-gray-3"
                content="목록으로 이동"
                href="/dashboard/symptomsList"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default SymptomDetailData;