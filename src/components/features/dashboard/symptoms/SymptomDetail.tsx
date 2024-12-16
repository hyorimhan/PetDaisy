"use client";
import Card from "@/components/common/Card/Card";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import useDeleteSymptoms from "@/hooks/symptoms/useDeleteSymptoms";
import useGetSymptomsDetail from "@/hooks/symptoms/useGetSymptomsDetail";
import useModalStore from "@/zustand/useModalStore";
import Image from "next/image";
import Link from "next/link";

function SymptomDetail({ post_id }: Readonly<{ post_id: string }>) {
  const { symptomsDetail, isError, isPending } = useGetSymptomsDetail(post_id);
  const { openModal } = useModalStore();
  const handleDelete = useDeleteSymptoms();
  return (
    <QueryStateHandler
      data={symptomsDetail}
      isError={isError}
      isPending={isPending}
    >
      <div className="opacity-90 py-7 text-main-5 text-base font-light ">
        관찰 기록
      </div>
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
            <Link href={`/dashboard/symptomsEdit/${detail.id}`}>
              <button className="w-full text-xl mt-7 text-white flex flex-col items-center justify-center h-[60px] bg-yellow-5 rounded-lg">
                수정하기
              </button>
            </Link>

            <button
              className="w-full h-[60px] mt-2 bg-gray-1 rounded-lg flex flex-col items-center justify-center text-xl text-gray-3"
              onClick={() => handleDelete.handleDeleteSymptoms(detail.id)}
            >
              삭제하기
            </button>
          </div>
        );
      })}
    </QueryStateHandler>
  );
}

export default SymptomDetail;
