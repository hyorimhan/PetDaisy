import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { pet_id: string } }
) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("weight_records")
      .select("*")
      .eq("pet_id", params.pet_id);

    if (error) return handleError(error.message);

    return handleSuccess(undefined, data);
  } catch {
    return handleNetworkError();
  }
}
