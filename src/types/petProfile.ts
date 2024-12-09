import { Tables } from "./supabase";

type PetDetailData = Omit<
  Tables<"pet_details">,
  "id" | "created_at" | "pet_id"
>;
type PetName = Pick<Tables<"pet_list">, "name">;
export type PetProfile = PetDetailData & PetName;
