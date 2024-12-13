"use client";
import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import useGetSymptoms from "@/hooks/symptoms/useGetSymptoms";
import Link from "next/link";

function SymptomsList() {
  const { symptomsData, isPending, isError } = useGetSymptoms();

  return (
    <QueryStateHandler
      data={symptomsData}
      isPending={isPending}
      isError={isError}
    >
      <div className="opacity-90 py-[1.6875rem] text-main-5 text-base font-light">
        관찰 기록
      </div>
      <Button
        content="관찰 기록 등록"
        types="addInfo"
        href={"/dashboard/symptomsWrite"}
      />
      <div className="pt-3 ">
        <Card>
          <div className="h-[600px]">
            {symptomsData?.map((symptom) => (
              <div className="bg-main-1 p-3 rounded-lg mb-2" key={symptom.id}>
                <Link
                  href={`/dashboard/symptomsDetail/${symptom.id}`}
                  className="flex flex-col"
                >
                  <span className="text-gray-3 text-xs">
                    {symptom.symptom_date}
                  </span>
                  <span className="mt-2">{symptom.title}</span>
                </Link>
                {/* {symptom.images && (
                  <Image
                    src={
                      Array.isArray(symptom.images)
                        ? symptom.images.map((image) => image)
                        : symptom?.images[0]
                    }
                    alt="symptomImg"
                    width={100}
                    height={100}
                  />
                )} */}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </QueryStateHandler>
  );
}

export default SymptomsList;
