"use client";
import Card from "@/components/common/Card/Card";
import Loading from "@/components/common/Loading/Loading";
import Page from "@/components/common/Page/Page";
import LastMedical from "@/components/features/dashboard/medical/list/LastMedical";
import PetList from "@/components/features/dashboard/petList/PetList";
import PetProfile from "@/components/features/dashboard/petProfile/PetProfile";
import Weight from "@/components/features/dashboard/weight/Weight";
import { useAuthStore } from "@/zustand/useAuthStore";
import { usePetStore } from "@/zustand/usePetStore";
import { lazy, Suspense } from "react";
const Medical = lazy(
  () => import("@/components/features/dashboard/medical/list/Medical")
);
const Vaccine = lazy(
  () => import("@/components/features/dashboard/vaccine/list/Vaccine")
);
const Symptoms = lazy(
  () => import("@/components/features/dashboard/symptoms/Symptoms")
);
const DeletePet = lazy(
  () => import("@/components/features/dashboard/petProfile/DeletePet")
);

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const petId = usePetStore((state) => state.petId);
  return (
    <>
      <PetList />
      <Page>
        {user?.id && petId ? (
          <div className="space-y-3">
            <PetProfile />
            <LastMedical />
            <Weight />
            <Suspense fallback={<Loading />}>
              <Medical />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <Vaccine />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <Symptoms />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <DeletePet />
            </Suspense>
          </div>
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
