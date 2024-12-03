// import { createClient } from '@/supabase/client';

// const supabase = createClient();
export const handleJoin = async ({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) => {
  const response = await fetch('/api/auth/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, nickname }),
  });
  return response.json();
};

export const handleLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};
