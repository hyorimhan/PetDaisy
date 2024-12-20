import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { NextRequest } from "next/server";
import { ParamsType } from "../../../../types/common";

export async function GET(request: NextRequest, { params }: ParamsType) {
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
    console.error(error);
    return handleNetworkError();
  }
}

export async function PATCH(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { petId } = await params;
  const data = await request.json();

  try {
    const { data: PetDetails, error: petDetailsError } = await supabase
      .from("pet_details")
      .update({
        gender: data.gender,
        birth_date: data.birth,
        weight: data.weight,
        neutered: data.neutered,
        images: data.images,
        animal_type: data.animalType,
      })
      .eq("pet_id", petId)
      .select("*, pet_list(name)")
      .single();

    if (petDetailsError) {
      console.error(petDetailsError);
      return handleError(
        `반려동물 정보를 수정하는 데 실패했습니다. ${petDetailsError.message}`
      );
    }

    return handleSuccess(
      "반려동물 정보를 수정하는데 성공했습니다.",
      PetDetails
    );
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}

export async function DELETE(request: NextRequest, { params }: ParamsType) {
  const supabase = await createClient();
  const { petId } = await params;

  try {
    const { error } = await supabase
      .from("pet_details")
      .delete()
      .eq("pet_id", petId);

    if (error) {
      return handleError(
        `반려동물 정보를 삭제하는 데 실패했습니다. ${error.message}`
      );
    }

    const { error: petListError } = await supabase
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
    console.error(error);
    return handleNetworkError();
  }
}
