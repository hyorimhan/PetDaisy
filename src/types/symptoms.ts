import { Tables } from "./supabase";

export type Symptom = Tables<"symptoms">;

export type SymptomsData = {
  data: Symptom[];
  count: number;
  page: number;
  limit: number;
};
