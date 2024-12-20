"use client";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/authValidation";
import { useLoginMutation } from "@/hooks/auth/useLoginMutation";
import { formError } from "@/utils/error/form";

import { useForm } from "react-hook-form";

type LoginDataType = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>();

  const loginMutation = useLoginMutation();

  return (
    <form
      onSubmit={handleSubmit((data) => loginMutation.mutate(data), formError)}
      className="pt-[50px] space-y-5 w-full"
    >
      <div>
        <Input
          label="이메일"
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
          className="font-serif w-full"
          error={errors.password}
        />
      </div>
      <Button
        type="submit"
        content="로그인"
        types="lg"
        textColor="text-white"
        bgColor="bg-main-4"
      />
    </form>
  );
}

export default LoginForm;
