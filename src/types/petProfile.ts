import { Tables } from "./supabase";

export type PetRegistrationType = {
  name: string;
  gender: string;
  birth: string;
  weight: string;
  neutered: string;
  animalType: string;
};

type PetDetailData = Omit<
  Tables<"pet_details">,
  "id" | "created_at" | "pet_id"
>;
type PetName = Pick<Tables<"pet_list">, "name" | "user_id">;
export type PetDetails = PetDetailData & PetName;

export type PetListType = Tables<"pet_list">[];
export type PetProfileType = PetDetails & { pet_list: { name: string } };
