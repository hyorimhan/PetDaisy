import { createClient } from "@/supabase/server";
import {
  handleError,
  handleNetworkError,
  handleSuccess,
} from "@/utils/error/api";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  try {
    const { email, password } = await request.json();
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (user.session === null)
      return handleError("로그인에 실패했습니다. 다시 확인해주세요");

    if (error) return handleError("로그인에 실패했습니다");

    return handleSuccess("로그인 되었습니다", user);
  } catch {
    return handleNetworkError();
  }
}
