import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
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
