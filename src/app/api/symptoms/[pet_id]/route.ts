import { NextRequest } from "next/server";
import { paramsType } from "../../../../types/common";
import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { getPaginationParams } from "@/utils/paginate/pagination";

export async function GET(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const { pet_id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const { page, limit, from, to } = getPaginationParams(searchParams);
  try {
    if (!searchParams.get("page") && !searchParams.get("limit")) {
      const { data: symptomsAllData, error: allDataError } = await supabase
        .from("symptoms")
        .select("*")
        .eq("pet_id", pet_id);
      if (allDataError) {
        return handleError(allDataError.message);
      }
      return handleSuccess(undefined, { data: symptomsAllData });
    }
    const { data, error, count } = await supabase
      .from("symptoms")
      .select("*", { count: "exact" })
      .eq("pet_id", pet_id)
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
