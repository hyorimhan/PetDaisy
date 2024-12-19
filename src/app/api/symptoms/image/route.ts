import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { handleError, handleNetworkError } from "@/utils/error/api";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return handleError("이미지 파일이 없습니다");
    }

    const fileName = `images/${Date.now()}.webp`;

    const { data: imageData, error: imageError } = await supabase.storage
      .from("symptoms")
      .upload(fileName, file, {
        cacheControl: "600",
        upsert: false,
      });

    if (imageError) {
      return handleError("이미지 등록에 실패했습니다");
    }

    return NextResponse.json({ imageURL: imageData.path });
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}
