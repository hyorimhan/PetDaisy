import { createClient } from "@/supabase/server";
import {
  handleError,
  handleSuccess,
  handleNetworkError,
} from "@/utils/api/error/api";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  try {
    const response = await request.json();
    const { date, weight } = response;

    const { data, error } = await supabase
      .from("weight_records")
      .insert({
        weight,
        measured_at: date,
      })
      .select("*");

    if (error) return handleError("몸무게 등록에 실패했습니다");
    return handleSuccess("몸무게가 등록되었습니다", data);
  } catch {
    return handleNetworkError();
  }
}
