import { NextRequest } from "next/server";
import { paramsType } from "../../../../types/common";
import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";

export async function GET(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const { pet_id } = await params;
  try {
    const { data, error } = await supabase
      .from("symptoms")
      .select("*")
      .eq("pet_id", pet_id);

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess(undefined, data);
  } catch {
    return handleNetworkError();
  }
}

export async function POST(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const { pet_id } = await params;
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const symptom_date = formData.get("symptom_date");
    const images = formData.get("images");
    const imageUrls = images ? JSON.parse(images as string) : [];
    console.log(imageUrls);
    const { data: imageData, error: imageError } = await supabase.storage
      .from("symptoms")
      .upload(`images/${Date.now()}.webp`, imageUrls);

    if (imageError) {
      return handleError("이미지 등록에 실패했습니다");
    }

    const { data, error } = await supabase
      .from("symptoms")
      .insert({
        title,
        content,
        symptom_date,
        images: imageData.path,
        pet_id,
      })
      .select("*");

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess(undefined, data);
  } catch {
    return handleNetworkError();
  }
}
