"use client";
import Button from "@/components/common/Button/Button";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "@/constants/auth";
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
    <div>
      <form
        onSubmit={handleSubmit(
          (data) => loginMutation.mutate(data),
          handleError
        )}
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
