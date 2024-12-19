import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { NextRequest } from "next/server";
import { ParamsType } from "../../../../types/common";

export async function GET(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { userId } = await params;

  try {
    const { data, error } = await supabase
      .from("pet_list")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      return handleError(
        `반려동물 정보를 가져오는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(undefined, data);
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}
