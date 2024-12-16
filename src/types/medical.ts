import { Tables } from "./supabase";

export type MedicalVisit = Tables<"medical_visits">;
export type MedicalExpenses = Tables<"medical_expenses">;

export type MedicalVisits = MedicalVisit[];

export type MedicalVisitData = {
  data: MedicalVisits;
  count: number;
  page: number;
  limit: number;
};

export type MedicalExpenseFormValues = {
  service: string;
  price: number;
};

export type MedicalFormValues = {
  title: string;
  visitDate: string;
  hospitalName: string;
  content: string;
  nextVisitDate?: string;
  expenses: MedicalExpenseFormValues[];
};
