"use client";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import {
  NICKNAME_VALIDATION,
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  PASSWORD_CONFIRM_VALIDATION,
} from "@/constants/authValidation";

import { handleJoin } from "@/service/auth";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";

type joinFormDataType = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function JoinForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<joinFormDataType>({
    mode: "onChange",
  });
  const password = watch("password");
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);

  const joinMutation = useMutation({
    mutationFn: handleJoin,
    onSuccess: (response) => {
      openModal({
        type: "success",
        title: "회원가입 성공",
        content: response.message,
        onConfirm: () => {
          router.replace("/dashboard");
        },
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "회원가입 실패",
        content: error.message,
        onConfirm: () => {},
      });
    },
  });

  const handleError = (errors: FieldErrors) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) alert(error.message);
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => joinMutation.mutate(data), handleError)}
      className="space-y-5 pt-[3.125rem] w-full"
    >
      <div>
        <Input
          label="닉네임"
          type="text"
          {...register("nickname", NICKNAME_VALIDATION())}
        />
        {errors.nickname && (
          <p className="text-red-5 text-sm mt-1">{errors.nickname.message}</p>
        )}
      </div>
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
      <div>
        <Input
          label="비밀번호 확인"
          type="password"
          {...register(
            "passwordConfirm",
            PASSWORD_CONFIRM_VALIDATION(password)
          )}
          className="font-serif w-full"
        />
        {errors.passwordConfirm && (
          <p className="text-red-5 text-sm mt-1">
            {errors.passwordConfirm.message}
          </p>
        )}
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
