import { createClient } from "@/supabase/server";
import { paramsType } from "@/types/common";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();

  try {
    const userId = params.id;
    const { data, error: petListError } = await supabase
      .from("pet_list")
      .select("*")
      .eq("user_id", userId);

    if (!data) {
      handleError(
        `반려동물 정보를 가져오는데 실패했습니다.${petListError.message}`
      );
    }

    return handleSuccess(undefined, data);
  } catch (error) {
    return handleNetworkError();
  }
}
