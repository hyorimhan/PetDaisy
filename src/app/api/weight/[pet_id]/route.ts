import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";
import { NextRequest } from "next/server";
import { paramsType } from "../../../../types/common";
import { getPaginationParams } from "@/utils/paginate/pagination";

export async function GET(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const pet_id = params.pet_id;
  const searchParams = request.nextUrl.searchParams;
  const { page, limit, from, to } = getPaginationParams(searchParams);
  try {
    const { data, error, count } = await supabase
      .from("weight_records")
      .select("*", { count: "exact" })
      .eq("pet_id", pet_id)
      .order("measured_at", { ascending: false })
      .range(from, to);

    if (error) return handleError(error.message);

    return handleSuccess(undefined, { data: data, count, page, limit });
  } catch {
    return handleNetworkError();
  }
}

export async function POST(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const pet_id = params.pet_id;

  try {
    const response = await request.json();
    const { date, weight } = response;

    const { data, error } = await supabase
      .from("weight_records")
      .insert({
        weight,
        measured_at: date,
        pet_id,
      })
      .select("*");

    if (error) return handleError("몸무게 등록에 실패했습니다");
    return handleSuccess("몸무게가 등록되었습니다", data);
  } catch {
    return handleNetworkError();
  }
}
