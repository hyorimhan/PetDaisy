import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();

  const data = await request.json();

  try {
    const { data: Vaccinations, error } = await supabase
      .from("vaccinations")
      .delete()
      .eq("id", data);

    if (error) {
      return handleError(
        `예방 접종 정보를 삭제하는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(
      "예방 접종 정보를 성공적으로 삭제했습니다.",
      Vaccinations
    );
  } catch (error) {
    return handleNetworkError();
  }
}
