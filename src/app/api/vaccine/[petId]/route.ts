import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { getPaginationParams } from "@/utils/paginate/pagination";
import { NextRequest } from "next/server";
import { ParamsType } from "../../../../types/common";

export async function GET(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { petId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const { page, limit, from, to } = getPaginationParams(searchParams);

  try {
    let query = supabase.from("vaccinations").select("*").eq("pet_id", petId);

    query = query.order("vaccination_date", { ascending: false });

    if (!searchParams.get("page") || !searchParams.get("limit")) {
      const { data, error } = await query;

      if (error) {
        return handleError(
          `예방 접종 정보를 가져오는데 실패했습니다. ${error.message}`
        );
      }
      return handleSuccess(undefined, {
        data,
        count: null,
        page: null,
        limit: null,
      });
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      return handleError(
        `예방 접종 정보를 가져오는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(undefined, { data, count, page, limit });
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}

export async function POST(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();

  const data = await request.json();
  const { petId } = await params;

  try {
    const { data: Vaccinations, error } = await supabase
      .from("vaccinations")
      .insert([
        {
          pet_id: petId,
          vaccination_date: data.vaccineDate,
          hospital_name: data.hospitalName,
          vaccine_name: data.vaccineName,
          note: data.note,
          price: data.price,
        },
      ]);

    if (error) {
      return handleError(
        `예방 접종 정보를 추가하는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(
      "예방 접종 정보를 성공적으로 추가했습니다.",
      Vaccinations
    );
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}

export async function PATCH(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();

  const data = await request.json();
  const { petId } = await params;

  try {
    const { data: Vaccinations, error } = await supabase
      .from("vaccinations")
      .update([
        {
          pet_id: petId,
          vaccination_date: data.vaccineDate,
          hospital_name: data.hospitalName,
          vaccine_name: data.vaccineName,
          note: data.note,
          price: data.price,
        },
      ])
      .eq("id", data.id);

    if (error) {
      return handleError(
        `예방 접종 정보를 추가하는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(
      "예방 접종 정보를 성공적으로 추가했습니다.",
      Vaccinations
    );
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}
