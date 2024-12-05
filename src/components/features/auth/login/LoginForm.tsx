"use client";
import Button from "@/components/common/Button/Button";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "@/constants/auth";
import { handleLogin } from "@/service/auth";
import { FieldErrors, useForm } from "react-hook-form";

type loginDataType = {
  email: string;
  password: string;
};

function LoginForm() {
  const { register, handleSubmit } = useForm<loginDataType>();
  const loginSubmit = async (data: loginDataType) => {
    const response = await handleLogin(data);
    if (response) {
      alert(response.message);
    }
  };

  const handleError = (errors: FieldErrors) => {
    Object.values(errors).forEach((error) => {
      if (error) return alert(error.message);
    });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(loginSubmit, handleError)}
        className="pt-[3.125rem] space-y-5"
      >
        <div>
          <label htmlFor="email">아이디</label>
          <input type="email" {...register("email", EMAIL_VALIDATION())} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            {...register("password", PASSWORD_VALIDATION())}
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
    </div>
  );
}

export default LoginForm;
