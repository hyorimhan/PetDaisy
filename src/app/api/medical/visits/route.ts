import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const { visitId } = data;
  const supabase = await createClient();

  try {
    const { error: deleteExpensesError } = await supabase
      .from("medical_expenses")
      .delete()
      .eq("medical_visit_id", visitId);

    if (deleteExpensesError) {
      return handleError(
        `병원비 정보를 삭제하는데 실패했습니다. ${deleteExpensesError.message}`
      );
    }

    const { error: deleteVisitError } = await supabase
      .from("medical_visits")
      .delete()
      .eq("id", visitId);

    if (deleteVisitError) {
      return handleError(
        `진료 기록을 삭제하는데 실패했습니다. ${deleteVisitError.message}`
      );
    }

    return handleSuccess("진료 기록을 삭제하였습니다.", visitId);
  } catch (error) {
    return handleNetworkError();
  }
}
