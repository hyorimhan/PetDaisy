import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { visitId: string } }
) {
  const supabase = await createClient();
  const { visitId } = await params;

  try {
    const { data, error } = await supabase
      .from("medical_visits")
      .select("*")
      .eq("id", visitId)
      .single();

    if (error) {
      return handleError(
        `진료 상세 정보를 가져오는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(undefined, data);
  } catch (error) {
    return handleNetworkError();
  }
}
