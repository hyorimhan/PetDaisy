"use client";
import Card from "@/components/common/Card/Card";
import Loading from "@/components/common/Loading/Loading";
import Page from "@/components/common/Page/Page";
import PetList from "@/components/features/dashboard/petList/PetList";
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
const LastMedical = lazy(
  () => import("@/components/features/dashboard/medical/list/LastMedical")
);
const PetProfile = lazy(
  () => import("@/components/features/dashboard/petProfile/PetProfile")
);
const Weight = lazy(
  () => import("@/components/features/dashboard/weight/Weight")
);

const DashboardPage = () => {
  const user_id = useAuthStore((state) => state.user?.id);
  const petId = usePetStore((state) => state.petId);
  return (
    <>
      <PetList />
      <Page>
        {user_id && petId ? (
          <div className="space-y-3">
            <Suspense fallback={<Loading />}>
              <PetProfile />
              <LastMedical />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <Weight />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <Medical />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <Vaccine />
              <Symptoms />
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
