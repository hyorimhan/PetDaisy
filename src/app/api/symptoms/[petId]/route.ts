import { createClient } from "@/supabase/server";
import { ParamsType } from "@/types/common";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { getPaginationParams } from "@/utils/paginate/pagination";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { petId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const { page, limit, from, to } = getPaginationParams(searchParams);

  const year = searchParams.get("year");
  const month = searchParams.get("month");

  try {
    if (year && month) {
      const formattedMonth = month.padStart(2, "0");
      const startDate = `${year}-${formattedMonth}-01`;
      const endDate = `${year}-${formattedMonth}-31`;

      const { data, error, count } = await supabase
        .from("symptoms")
        .select("*")
        .eq("pet_id", petId)
        .gte("symptom_date", startDate)
        .lte("symptom_date", endDate)
        .order("symptom_date", { ascending: false })
        .range(from, to);

      if (error) {
        return handleError(error.message);
      }
      return handleSuccess(undefined, { data, count, page, limit });
    }

    if (!searchParams.get("page") && !searchParams.get("limit")) {
      const { data: symptomsAllData, error: allDataError } = await supabase
        .from("symptoms")
        .select("*")
        .eq("pet_id", petId)
        .order("symptom_date", { ascending: false });
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
      .order("symptom_date", { ascending: false });

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
