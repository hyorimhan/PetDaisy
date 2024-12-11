"use client";
import Card from "@/components/common/Card/Card";
import Error from "@/components/common/Error/Error";
import Loading from "@/components/common/Loading/Loading";
import { useGetPetProfile } from "@/hooks/useGetPetProfile";
import { usePetStore } from "@/zustand/usePetStore";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import ProfileTitle from "./ProfileTitle";

function PetProfile() {
  const petId = usePetStore((state) => state.petId) as string;
  const { details, isPending, isError } = useGetPetProfile(petId);
  const parsedImages = details?.images ? JSON.parse(details.images) : [];

  if (!details)
    return (
      <Card>
        <Loading />
      </Card>
    );

  if (isPending)
    return (
      <Card>
        <Loading />
      </Card>
    );

  if (isError)
    return (
      <Card>
        <Error />
      </Card>
    );

  return (
    <div className="flex gap-3 ">
      <ProfileImage images={parsedImages} />
      <Card>
        <ProfileTitle details={details} />
        <ProfileInfo details={details} />
      </Card>
    </div>
  );
}

export default PetProfile;
