"use client";
import Card from "@/components/common/Card/Card";
import CardTitle from "@/components/common/Card/CardTitle";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import useGetSymptoms, {
  symptomsDataType,
} from "@/hooks/symptoms/useGetSymptoms";
import Link from "next/link";

function Symptoms() {
  const { symptomsData, isError, isPending } = useGetSymptoms();
  const recentSymptoms = symptomsData?.data.slice(-3).reverse();
  console.log(symptomsData);
  return (
    <QueryStateHandler
      data={symptomsData}
      isError={isError}
      isPending={isPending}
    >
      <Card>
        <div className="w-full h-[240px]">
          <CardTitle title="관찰 기록" link="/dashboard/symptomsList" />
          {recentSymptoms?.map((symptoms: symptomsDataType) => (
            <Link
              key={symptoms.id}
              href={`dashboard/symptomsDetail/${symptoms.id}`}
            >
              <div
                className="w-full h-[65px] p-3 flex flex-col bg-main-1 my-2 rounded-lg"
                key={symptoms.id}
              >
                <span className="text-xs text-gray-3">
                  {symptoms.symptom_date}
                </span>
                <span className="mt-2"> {symptoms.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </QueryStateHandler>
  );
}

export default Symptoms;
