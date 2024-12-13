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
    const formData = await request.json();

    const images = formData.images;
    const imageUrls = images ? JSON.parse(images as string) : [];

    const { data, error } = await supabase
      .from("symptoms")
      .insert({
        title: formData.title,
        content: formData.content,
        symptom_date: formData.symptom_date,
        images: imageUrls,
        pet_id,
      })
      .select("*");

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess(undefined, data);
  } catch (error) {
    return handleNetworkError();
  }
}
