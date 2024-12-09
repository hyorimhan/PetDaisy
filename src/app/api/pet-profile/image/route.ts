import { createClient } from "@/supabase/server";
import { handleError, handleNetworkError } from "@/utils/api/error/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  try {
    const data = await request.formData();
    const newImage = data.get("file") as FormDataEntryValue;
    const { data: image } = await supabase.storage
      .from("pet-profiles")
      .upload(`pet_${Date.now()}.webp`, newImage, {
        cacheControl: "600",
        upsert: false,
      });

    if (!image) {
      return handleError("이미지 업로드에 실패했습니다");
    }

    return NextResponse.json({
      imageURL: image?.path || "",
    });
  } catch {
    return handleNetworkError();
  }
}
