"use client";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import {
  EMAIL_VALIDATION,
  NICKNAME_VALIDATION,
  PASSWORD_CONFIRM_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/authValidation";
import { useJoinMutation } from "@/hooks/auth/useJoinMutation";
import { formError } from "@/utils/error/form";

import { useForm } from "react-hook-form";

type JoinFormDataType = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

function JoinForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinFormDataType>({
    mode: "onChange",
  });
  const password = watch("password");

  const joinMutation = useJoinMutation();
  return (
    <form
      onSubmit={handleSubmit((data) => joinMutation.mutate(data), formError)}
      className="space-y-5 pt-[3.125rem] w-full"
    >
      <div>
        <Input
          label="닉네임"
          type="text"
          {...register("nickname", NICKNAME_VALIDATION())}
          error={errors.nickname}
        />
      </div>
      <div>
        <Input
          label="아이디"
          type="email"
          {...register("email", EMAIL_VALIDATION())}
          error={errors.email}
        />
      </div>
      <div>
        <Input
          label="비밀번호"
          type="password"
          {...register("password", PASSWORD_VALIDATION())}
          error={errors.password}
        />
      </div>
      <div>
        <Input
          label="비밀번호 확인"
          type="password"
          {...register(
            "passwordConfirm",
            PASSWORD_CONFIRM_VALIDATION(password)
          )}
          error={errors.passwordConfirm}
        />
      </div>
      <Button
        content="회원가입"
        types="lg"
        textColor="text-white"
        bgColor="bg-blue-4"
        type="submit"
      />
    </form>
  );
}

export default JoinForm;
