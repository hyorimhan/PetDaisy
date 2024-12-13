import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { getPaginationParams } from "@/utils/paginate/pagination";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { petId: string } }
) {
  const supabase = await createClient();
  const { petId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const { page, limit, from, to } = getPaginationParams(searchParams);

  const year = searchParams.get("year");
  const month = searchParams.get("month");

  try {
    let query = supabase.from("medical_visits").select("*").eq("pet_id", petId);

    if (year && month) {
      const formattedMonth = month.padStart(2, "0");
      const startDate = `${year}-${formattedMonth}-01`;
      const endDate = `${year}-${formattedMonth}-31`;

      query = query.gte("visit_date", startDate).lte("visit_date", endDate);
    }

    query = query.order("visit_date", { ascending: false });

    if (!searchParams.get("page") || !searchParams.get("limit")) {
      const { data, error } = await query;

      if (error) {
        return handleError(
          `진료 정보를 가져오는데 실패했습니다. ${error.message}`
        );
      }
      return handleSuccess(undefined, data);
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      return handleError(
        `진료 정보를 가져오는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(undefined, { data, count, page, limit });
  } catch (error) {
    return handleNetworkError();
  }
}
