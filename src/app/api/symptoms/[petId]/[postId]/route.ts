import { NextRequest } from "next/server";
import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { ParamsType } from "@/types/common";

export async function GET(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { postId } = await params;
  try {
    const { data, error } = await supabase
      .from("symptoms")
      .select("*")
      .eq("id", postId);

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess(undefined, data);
  } catch {
    return handleNetworkError();
  }
}

export async function DELETE(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { postId } = await params;
  try {
    const { error } = await supabase.from("symptoms").delete().eq("id", postId);

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess("삭제 되었습니다");
  } catch {
    return handleNetworkError();
  }
}

export async function PATCH(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { postId } = await params;
  const { date, content, title, images } = await request.json();
  try {
    const { data, error } = await supabase
      .from("symptoms")
      .update({ content, title, images, symptom_date: date })
      .eq("id", postId)
      .select();
    if (error) {
      return handleError(error.message);
    }
    return handleSuccess("수정되었습니다", data);
  } catch {
    return handleNetworkError();
  }
}
