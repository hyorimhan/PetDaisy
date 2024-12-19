import { createClient } from "@/supabase/server";
import { ParamsType } from "@/types/common";
import { MedicalExpenses } from "@/types/medical";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { getPaginationParams } from "@/utils/paginate/pagination";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { petId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const { page, limit, from, to } = getPaginationParams(searchParams);

  const year = searchParams.get("year");
  const month = searchParams.get("month");

  try {
    let query = supabase.from("medical_visits").select("*").eq("pet_id", petId);

    if (year && month) {
      const formattedMonth = month.padStart(2, "0");
      const startDate = `${year}-${formattedMonth}-01`;
      const endDate = `${year}-${formattedMonth}-31`;

      query = query.gte("visit_date", startDate).lte("visit_date", endDate);
    }

    query = query.order("visit_date", { ascending: false });

    if (!searchParams.get("page") || !searchParams.get("limit")) {
      const { data, error } = await query;

      if (error) {
        return handleError(
          `진료 정보를 가져오는데 실패했습니다. ${error.message}`
        );
      }
      return handleSuccess(undefined, data);
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      return handleError(
        `진료 정보를 가져오는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(undefined, { data, count, page, limit });
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}
export async function POST(request: NextRequest, { params }: ParamsType) {
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

    return handleSuccess(undefined, medicalExpensesData);
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}

export async function PATCH(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const data = await request.json();
  const { petId } = await params;
  try {
    const { data: medicalVisitData, error: medicalVisitError } = await supabase
      .from("medical_visits")
      .update({
        title: data.title,
        visit_date: data.visitDate,
        hospital_name: data.hospitalName,
        content: data.content,
        next_visit_date: data.nextVisitDate,
        pet_id: petId,
      })
      .eq("id", data.id)
      .select("id")
      .single();

    if (medicalVisitError) {
      return handleError(
        `진료 정보를 수정하는데 실패했습니다. ${medicalVisitError.message}`
      );
    }

    const { error: deleteError } = await supabase
      .from("medical_expenses")
      .delete()
      .eq("medical_visit_id", data.id);

    if (deleteError) {
      return handleError(
        `기존 병원비 정보를 삭제하는데 실패했습니다. ${deleteError.message}`
      );
    }

    const expensesData = data.expenses.map((expense: MedicalExpenses) => ({
      medical_visit_id: medicalVisitData.id,
      service: expense.service,
      price: expense.price,
      pet_id: petId,
    }));

    const { error: expensesError } = await supabase
      .from("medical_expenses")
      .insert(expensesData)
      .select("*");

    if (expensesError) {
      return handleError(
        `새로운 병원비 정보를 등록하는데 실패했습니다. ${expensesError.message}`
      );
    }

    return handleSuccess("진료 정보가 수정되었습니다", null);
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}
