import { Tables } from "./supabase";

export type MedicalVisits = Tables<"medical_visits">;
export type MedicalExpenses = Tables<"medical_expenses">;

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
