import { createClient } from "@/supabase/server";
import {
  handleError,
  handleJoinError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  try {
    const response = await request.json();
    const { email, password, nickname } = response;

    const { data, error: joinError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: nickname,
        },
      },
    });

    if (joinError) return handleJoinError(joinError.message);

    const { data: existingUserData } = await supabase
      .from("user")
      .select()
      .eq("id", data?.user?.id)
      .single();

    if (existingUserData) {
      return handleError("이미 존재하는 사용자입니다");
    }

    const { error: userError } = await supabase.from("user").insert({
      nickname: nickname,
      id: data?.user?.id,
    });

    if (userError) return handleError(userError.message);
    return handleSuccess("회원가입 되었습니다");
  } catch {
    return handleNetworkError();
  }
}
