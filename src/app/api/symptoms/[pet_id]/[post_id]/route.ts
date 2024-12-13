import { NextRequest } from "next/server";
import { createClient } from "@/supabase/server";
import { paramsType } from "../../../../../types/common";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";

export async function GET(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const { post_id } = await params;
  try {
    const { data, error } = await supabase
      .from("symptoms")
      .select("*")
      .eq("id", post_id);

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess(undefined, data);
  } catch {
    return handleNetworkError();
  }
}

export async function DELETE(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const { post_id } = await params;
  try {
    const { error } = await supabase
      .from("symptoms")
      .delete()
      .eq("id", post_id);

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess("삭제 되었습니다");
  } catch {
    return handleNetworkError();
  }
}

export async function PATCH(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const { post_id } = await params;
  const { date, content, title, images } = await request.json();
  try {
    const { data, error } = await supabase
      .from("symptoms")
      .update({ content, title, images, symptom_date: date })
      .eq("id", post_id)
      .select();
    if (error) {
      return handleError(error.message);
    }
    return handleSuccess("수정되었습니다", data);
  } catch {
    return handleNetworkError();
  }
}
