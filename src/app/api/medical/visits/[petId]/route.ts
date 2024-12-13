import { createClient } from "@/supabase/server";
import { MedicalExpenses } from "@/types/medical";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { petId: string } }
) {
  const supabase = await createClient();
  const { petId } = await params;

  try {
    const { data, error } = await supabase
      .from("medical_visits")
      .select("*")
      .eq("pet_id", petId)
      .order("visit_date", { ascending: false });

    if (error) {
      return handleError(
        `진료 정보를 가져오는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(undefined, data);
  } catch (error) {
    return handleNetworkError();
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { petId: string } }
) {
  const supabase = await createClient();
  const data = await request.json();
  const { petId } = await params;
  try {
    const { data: medicalVisitData, error: medicalVisitError } = await supabase
      .from("medical_visits")
      .insert({
        title: data.title,
        visit_date: data.visitDate,
        hospital_name: data.hospitalName,
        content: data.content,
        next_visit_date: data.nextVisitDate,
        pet_id: petId,
      })
      .select("id")
      .single();

    if (medicalVisitError) {
      return handleError(
        `진료 정보를 등록하는데 실패했습니다. ${medicalVisitError.message}`
      );
    }

    const expensesData = data.expenses.map((expense: MedicalExpenses) => ({
      medical_visit_id: medicalVisitData.id,
      service: expense.service,
      price: expense.price,
      pet_id: petId,
    }));

    const { data: medicalExpensesData, error: expensesError } = await supabase
      .from("medical_expenses")
      .insert(expensesData);

    if (expensesError) {
      return handleError(
        `병원비 정보를 등록하는데 실패했습니다. ${expensesError.message}`
      );
    }

    console.log("medicalVisitData", medicalVisitData);
    console.log("medicalExpensesData", medicalExpensesData);

    return handleSuccess(undefined, medicalExpensesData);
  } catch (error) {
    return handleNetworkError();
  }
}
