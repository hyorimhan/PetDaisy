import { NextRequest } from "next/server";
import { paramsType } from "../../../../types/common";
import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";

export async function GET(request: NextRequest, { params }: paramsType) {
  const supabase = await createClient();
  const pet_id = params.id;
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
