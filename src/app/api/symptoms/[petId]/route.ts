import { NextRequest } from "next/server";
import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { getPaginationParams } from "@/utils/paginate/pagination";
import { ParamsType } from "@/types/common";

export async function GET(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { petId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const { page, limit, from, to } = getPaginationParams(searchParams);
  try {
    if (!searchParams.get("page") && !searchParams.get("limit")) {
      const { data: symptomsAllData, error: allDataError } = await supabase
        .from("symptoms")
        .select("*")
        .eq("pet_id", petId);
      if (allDataError) {
        return handleError(allDataError.message);
      }
      return handleSuccess(undefined, { data: symptomsAllData });
    }
    const { data, error, count } = await supabase
      .from("symptoms")
      .select("*", { count: "exact" })
      .eq("pet_id", petId)
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess(undefined, { data: data, page, limit, count });
  } catch {
    return handleNetworkError();
  }
}

export async function POST(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { petId } = await params;

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
        pet_id: petId,
      })
      .select("*");

    if (error) {
      return handleError(error.message);
    }
    return handleSuccess(undefined, data);
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}
