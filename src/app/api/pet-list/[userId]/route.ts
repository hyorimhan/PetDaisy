import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const supabase = await createClient();
  const { userId } = await params;

  try {
    const { data, error: petListError } = await supabase
      .from("pet_list")
      .select("*")
      .eq("user_id", userId);

    if (petListError) {
      return handleError(
        `반려동물 정보를 가져오는데 실패했습니다. ${petListError.message}`
      );
    }

    return handleSuccess(undefined, data);
  } catch (error) {
    return handleNetworkError();
  }
}