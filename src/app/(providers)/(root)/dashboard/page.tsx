"use client";
import Card from "@/components/common/Card/Card";
import Page from "@/components/common/Page/Page";
import LastMedical from "@/components/features/dashboard/medical/list/LastMedical";
import Medical from "@/components/features/dashboard/medical/list/Medical";
import PetList from "@/components/features/dashboard/petList/PetList";
import PetProfile from "@/components/features/dashboard/petProfile/PetProfile";
import Symptoms from "@/components/features/dashboard/symptoms/Symptoms";
import Vaccine from "@/components/features/dashboard/vaccine/Vaccine";
import Weight from "@/components/features/dashboard/weight/Weight";
import { useAuthStore } from "@/zustand/useAuthStore";
import { usePetStore } from "@/zustand/usePetStore";

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const petId = usePetStore((state) => state.petId);
  return (
    <>
      <PetList />
      <Page>
        {user?.id && petId ? (
          <>
            <div className="space-y-3">
              <PetProfile />
              <LastMedical />
              <Weight />
              <Medical />
              <Vaccine />
              <Symptoms />
            </div>
          </>
        ) : (
          <Card>
            <div className="py-[120px] text-center text-gray-4">
              반려 동물을 등록해주세요.
            </div>
          </Card>
        )}
      </Page>
    </>
  );
};

export default DashboardPage;
