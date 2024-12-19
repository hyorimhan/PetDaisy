"use client";
import Button from "@/components/common/Button/Button";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import HasVaccineIcon from "@/components/features/dashboard/vaccine/list/HasVaccineIcon";
import VaccineList from "@/components/features/dashboard/vaccine/list/VaccineList";
import usePagination from "@/hooks/paginate/usePagination";
import { useGetVaccineList } from "@/hooks/vaccine/useGetVaccineList";
import { usePetStore } from "@/zustand/usePetStore";

const VaccineListpage = () => {
  const petId = usePetStore((state) => state.petId) as string;
  const { page, limit, onPageChange, currentPage } = usePagination();
  const { vaccinations, isPending, isError } = useGetVaccineList(
    petId,
    page,
    limit
  );
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
          {vaccinations && (
            <>
              <VaccineList
                vaccinations={vaccinations.data}
                onPageChange={onPageChange}
                currentPage={currentPage}
                limit={limit}
                count={vaccinations.count}
              />
              <HasVaccineIcon vaccinations={vaccinations.data} />
            </>
          )}
        </QueryStateHandler>
      </div>
    </Page>
  );
};

export default VaccineListpage;
