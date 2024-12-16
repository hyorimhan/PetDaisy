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

type loginDataType = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginDataType>();

  const loginMutation = useLoginMutation();
  //formError(errors); 알럿이 아니라 에러메세지를 띄워야할 듯함

  return (
    <form
      onSubmit={handleSubmit((data) => loginMutation.mutate(data), formError)}
      className="pt-[3.125rem] space-y-5 w-full"
    >
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
