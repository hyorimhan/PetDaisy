import { createClient } from "@/supabase/server";
import { ParamsType } from "@/types/common";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { visitId } = await params;

  try {
    const { data, error: petListError } = await supabase
      .from("medical_expenses")
      .select("*")
      .eq("medical_visit_id", visitId);

    if (petListError) {
      return handleError(
        `진료 비용 정보를 가져오는데 실패했습니다. ${petListError.message}`
      );
    }

    return handleSuccess(undefined, data);
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}
