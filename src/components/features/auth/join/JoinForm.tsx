'use client';
import {
  EMAIL_VALIDATION,
  NICKNAME_VALIDATION,
  PASSWORD_CONFIRM_VALIDATION,
  PASSWORD_VALIDATION,
} from '@/constants/auth';
import { handleJoin } from '@/service/auth';
import { FieldErrors, useForm } from 'react-hook-form';

type joinFormDataType = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function JoinForm() {
  const { register, handleSubmit, watch } = useForm<joinFormDataType>();
  const password = watch('password');

  const joinSubmit = async (data: joinFormDataType) => {
    const response = await handleJoin(data);
    if (response) {
      alert(response.message);
    }
  };
  const handleError = (errors: FieldErrors) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) alert(error.message);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(joinSubmit, handleError)}>
        <div>
          <label htmlFor="nickname" className="text-4xl">
            닉네임
          </label>
          <input type="text" {...register('nickname', NICKNAME_VALIDATION())} />
        </div>
        <div>
          <label htmlFor="email">아이디</label>
          <input type="email" {...register('email', EMAIL_VALIDATION())} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            {...register('password', PASSWORD_VALIDATION())}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            {...register(
              'passwordConfirm',
              PASSWORD_CONFIRM_VALIDATION(password)
            )}
          />
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default JoinForm;
