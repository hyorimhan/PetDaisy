"use client";
import Card from "@/components/common/Card/Card";
import Error from "@/components/common/Error/Error";
import Loading from "@/components/common/Loading/Loading";
import { getPetProfile } from "@/service/petProfile";
import { PetProfileType } from "@/types/petProfile";
import { usePetStore } from "@/zustand/usePetStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import ProfileTitle from "./ProfileTitle";

function PetProfile() {
  const petId = usePetStore((state) => state.petId) as string;

  const [images, setImages] = useState<string[]>([]);

  const {
    data: details,
    isPending,
    isError,
  } = useQuery<PetProfileType>({
    queryKey: ["petProfile", petId],
    queryFn: () => getPetProfile(petId),
    enabled: !!petId,
  });

  useEffect(() => {
    if (details?.images) {
      const parsedImages = JSON.parse(details.images);
      setImages(parsedImages);
    } else {
      setImages([]);
    }
  }, [details]);

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
      <ProfileImage images={images} />
      <Card>
        <ProfileTitle details={details} />
        <ProfileInfo details={details} />
      </Card>
    </div>
  );
}

export default PetProfile;
