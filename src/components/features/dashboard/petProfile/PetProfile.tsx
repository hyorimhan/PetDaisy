"use client";
import Card from "@/components/common/Card/Card";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import { useGetPetProfile } from "@/hooks/profile/useGetPetProfile";
import { usePetStore } from "@/zustand/usePetStore";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import ProfileTitle from "./ProfileTitle";

function PetProfile() {
  const petId = usePetStore((state) => state.petId) as string;
  const { details, isPending, isError } = useGetPetProfile(petId);
  const parsedImages = details?.images ? JSON.parse(details.images) : [];

  return (
    <QueryStateHandler data={details} isPending={isPending} isError={isError}>
      <div className="flex gap-3 ">
        <ProfileImage images={parsedImages} />
        <Card>
          {details && (
            <>
              <ProfileTitle details={details} />
              <ProfileInfo details={details} />
            </>
          )}
        </Card>
      </div>
    </QueryStateHandler>
  );
}

export default PetProfile;
