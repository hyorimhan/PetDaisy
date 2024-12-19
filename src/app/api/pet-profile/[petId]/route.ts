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
      .from("pet_details")
      .select("*, pet_list(name)")
      .eq("pet_id", petId)
      .single();

    if (error) {
      return handleError(
        `반려동물 정보를 가져오는데 실패했습니다. ${error.message}`
      );
    }

    return handleSuccess(undefined, data);
  } catch (error) {
    return handleNetworkError();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { petId: string } }
) {
  const supabase = await createClient();
  const { petId } = await params;

  try {
    const { data, error } = await supabase
      .from("pet_details")
      .delete()
      .eq("pet_id", petId);

    if (error) {
      return handleError(
        `반려동물 정보를 삭제하는 데 실패했습니다. ${error.message}`
      );
    }

    const { data: petList, error: petListError } = await supabase
      .from("pet_list")
      .delete()
      .eq("id", petId);

    if (petListError) {
      return handleError(
        `반려동물 정보를 삭제하는 데 실패했습니다.${petListError.message}`
      );
    }

    return handleSuccess("반려동물 정보를 삭제하였습니다.", null);
  } catch (error) {
    return handleNetworkError();
  }
}
