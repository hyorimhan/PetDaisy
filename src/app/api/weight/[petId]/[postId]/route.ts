import { NextRequest } from "next/server";
import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { ParamsType } from "@/types/common";

export async function DELETE(request: NextRequest, { params }: ParamsType) {
  const { postId } = await params;
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("weight_records")
      .delete()
      .eq("id", postId);

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess("삭제되었습니다");
  } catch {
    return handleNetworkError();
  }
}
