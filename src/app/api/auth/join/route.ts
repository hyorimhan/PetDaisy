import { createClient } from '@/supabase/server';
import {
  handleError,
  handleJoinError,
  handleNetworkError,
  handleSuccess,
} from '@/utils/api/error/api';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const response = await request.json();
    const { nickname, email, password } = response;
    const { error: joinError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: nickname,
        },
      },
    });

    if (joinError) return handleJoinError(joinError.message);

    const { error: userError } = await supabase
      .from('user')
      .insert({ nickname: nickname });

    if (userError) return handleError(userError.message);

    return handleSuccess('회원가입 되었습니다');
  } catch {
    return handleNetworkError();
  }
}
