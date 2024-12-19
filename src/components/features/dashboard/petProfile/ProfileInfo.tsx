"use client";
import { YES } from "@/constants/pet";
import useGetWeight from "@/hooks/weight/useGetWeight";
import { PetProfileType } from "@/types/petProfile";

function ProfileInfo({ details }: { details: PetProfileType }) {
  const { weightData } = useGetWeight();
  const lastWeight = weightData?.data[0]?.weight;
  return (
    <ul className="text-gray-4">
      <li>생일: {details.birth_date}</li>
      <li>몸무게: {lastWeight || details.weight}kg</li>
      <li>{details.neutered === YES ? "중성화 완료" : "중성화 예정"}</li>
    </ul>
  );
}

export default ProfileInfo;
