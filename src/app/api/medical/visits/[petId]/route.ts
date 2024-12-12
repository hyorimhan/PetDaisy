import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { petId: string } }
) {
  const supabase = await createClient();
  const { petId } = await params;

  try {
    const { data, error } = await supabase
      .from("medical_visits")
      .select("*")
      .eq("pet_id", petId)
      .order("visit_date", { ascending: false });

    if (error) {
      return handleError(
        `진료 정보를 가져오는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(undefined, data);
  } catch (error) {
    return handleNetworkError();
  }
}
