import { NextRequest } from "next/server";
import { paramsType } from "../../../../types/common";
import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";

export async function GET(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const pet_id = params.pet_id;
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
  const pet_id = params.pet_id;
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const image = formData.get("image") as File;

    const { data: imageData, error: imageError } = await supabase.storage
      .from("symptoms")
      .upload(`images/${Date.now()}.webp`, image);

    if (imageError) {
      return handleError("이미지 등록에 실패했습니다");
    }

    const { data, error } = await supabase
      .from("symptoms")
      .insert({
        title,
        description,
        symptoms_date: date,
        image: imageData.path,
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
