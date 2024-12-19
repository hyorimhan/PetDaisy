"use client";
import Card from "@/components/common/Card/Card";
import CardTitle from "@/components/common/Card/CardTitle";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import useGetSymptoms, {
  SymptomsDataType,
} from "@/hooks/symptoms/useGetSymptoms";
import Link from "next/link";

function Symptoms() {
  const { symptomsData, isError, isPending } = useGetSymptoms();
  const recentSymptoms = symptomsData?.data.slice(-3).reverse();

  if (recentSymptoms?.length === 0) {
    return (
      <Card>
        <CardTitle title="관찰 기록" link="/dashboard/symptomsList" />
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center p-6 py-[120px]">
            <p className="text-lg text-gray-4">관찰 기록을 등록해주세요</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <QueryStateHandler
      data={symptomsData}
      isError={isError}
      isPending={isPending}
    >
      <Card>
        <CardTitle title="관찰 기록" link="/dashboard/symptomsList" />
        <ul className="flex flex-col gap-2 mt-2">
          {recentSymptoms?.map((symptoms: SymptomsDataType) => (
            <li key={symptoms.id}>
              <Link href={`dashboard/symptomsDetail/${symptoms.id}`}>
                <div
                  className="w-full p-3 flex flex-col bg-main-1 rounded-lg"
                  key={symptoms.id}
                >
                  <span className="text-xs text-gray-3">
                    {symptoms.symptom_date}
                  </span>
                  <span className="mt-1"> {symptoms.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </QueryStateHandler>
  );
}

export default Symptoms;
