import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";
import { NextRequest } from "next/server";
import { paramsType } from "../../../../types/common";

export async function GET(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const pet_id = params.id;
  try {
    const { data, error } = await supabase
      .from("weight_records")
      .select("*")
      .eq("pet_id", pet_id);

    if (error) return handleError(error.message);

    return handleSuccess(undefined, data);
  } catch {
    return handleNetworkError();
  }
}

export async function POST(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const pet_id = params.id;
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
