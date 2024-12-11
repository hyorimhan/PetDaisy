"use client";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/authValidation";
import { handleLogin } from "@/service/auth";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";

type loginDataType = {
  email: string;
  password: string;
};

function LoginForm() {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);

  const { register, handleSubmit } = useForm<loginDataType>();

  const loginMutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: () => {
      openModal({
        type: "success",
        title: "로그인 성공",
        content: "로그인에 성공했습니다.",
        onConfirm: () => {
          router.replace("/dashboard");
        },
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "로그인 실패",
        content: "로그인에 실패했습니다.",
        onConfirm: () => {
          alert(error.message);
        },
      });
    },
  });

  const handleError = (errors: FieldErrors) => {
    Object.values(errors).forEach((error) => {
      if (error) return alert(error.message);
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => loginMutation.mutate(data), handleError)}
      className="pt-[3.125rem] space-y-5 w-full"
    >
      <div>
        <Input
          label="아이디"
          type="email"
          {...register("email", EMAIL_VALIDATION())}
        />
      </div>
      <div>
        <Input
          label="비밀번호"
          type="password"
          {...register("password", PASSWORD_VALIDATION())}
          className="font-serif w-full"
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
