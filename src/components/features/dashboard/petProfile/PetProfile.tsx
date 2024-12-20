"use client";
import Card from "@/components/common/Card/Card";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import { useGetPetProfile } from "@/hooks/profile/useGetPetProfile";
import { usePetStore } from "@/zustand/usePetStore";
import Link from "next/link";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import ProfileTitle from "./ProfileTitle";

function PetProfile() {
  const petId = usePetStore((state) => state.petId) as string;
  const { details, isPending, isError } = useGetPetProfile(petId);
  const parsedImages = details?.images ? JSON.parse(details.images) : [];

  return (
    <QueryStateHandler data={details} isPending={isPending} isError={isError}>
      <div className="flex gap-3 relative">
        <ProfileImage images={parsedImages} />
        <Card>
          {details && (
            <>
              <ProfileTitle details={details} />
              <ProfileInfo details={details} />
            </>
          )}
          <Link
            href={`/dashboard/pet-registration/${petId}`}
            className="text-[12px] text-gray-3 absolute right-3 top-3"
          >
            수정
          </Link>
        </Card>
      </div>
    </QueryStateHandler>
  );
}

export default PetProfile;
