import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/api/error/api";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  try {
    const data = await request.json();
    const {
      user_id,
      name,
      gender,
      birth_date,
      weight,
      neutered,
      animal_type,
      images,
    } = data;

    console.log("user_id", user_id);

    const { data: petList, error: petListError } = await supabase
      .from("pet_list")
      .insert({ name, user_id })
      .select()
      .single();

    if (!petList) {
      handleError(`반려동물 등록에 실패했습니다. ${petListError?.message}`);
    }

    const { data: petDetails, error: petDetailsError } = await supabase
      .from("pet_details")
      .insert({
        pet_id: petList.id,
        gender,
        birth_date,
        weight: +weight,
        neutered,
        animal_type,
        images,
      })
      .select()
      .single();

    if (!petDetails) {
      handleError(`반려동물 등록에 실패했습니다. ${petDetailsError?.message}`);
    }

    return handleSuccess("반려동물 등록이 완료되었습니다.", petDetails);
  } catch (error) {
    console.error(error);
    return handleNetworkError();
  }
}
