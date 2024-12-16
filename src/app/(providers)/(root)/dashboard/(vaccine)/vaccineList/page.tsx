"use client";
import Button from "@/components/common/Button/Button";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import HasVaccineIcon from "@/components/features/dashboard/vaccine/list/HasVaccineIcon";
import VaccineList from "@/components/features/dashboard/vaccine/list/VaccineList";
import { useGetVaccineList } from "@/hooks/vaccine/useGetVaccineList";
import { usePetStore } from "@/zustand/usePetStore";

const VaccineListpage = () => {
  const petId = usePetStore((state) => state.petId) as string;
  const { vaccinations, isPending, isError } = useGetVaccineList(petId);
  return (
    <Page>
      <PageTitle title="예방 접종 기록" />
      <div className="space-y-3">
        <div>
          <Button
            href="/dashboard/vaccineWrite"
            types="addInfo"
            content="진료 기록 등록"
          />
        </div>
        <QueryStateHandler
          data={vaccinations}
          isPending={isPending}
          isError={isError}
        >
          <VaccineList vaccinations={vaccinations} />
          <HasVaccineIcon vaccinations={vaccinations} />
        </QueryStateHandler>
      </div>
    </Page>
  );
};

export default VaccineListpage;
