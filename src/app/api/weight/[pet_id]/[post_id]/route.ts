import { NextRequest } from "next/server";
import { paramsType } from "../../../../../types/common";
import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";

export async function DELETE(request: NextRequest, { params }: paramsType) {
  const { post_id } = await params;
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("weight_records")
      .delete()
      .eq("id", post_id);

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess("삭제되었습니다");
  } catch {
    return handleNetworkError();
  }
}
