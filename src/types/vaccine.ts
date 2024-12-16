import { VACCINE_TYPE } from "@/constants/vaccine";
import { Tables } from "./supabase";

export type VaccineType = (typeof VACCINE_TYPE)[keyof typeof VACCINE_TYPE];

export type Vaccination = Tables<"vaccinations">;
export type Vaccinations = Vaccination[];