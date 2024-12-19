"use client";
import { handleJoin } from "@/service/auth";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useJoinMutation = () => {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);

  return useMutation({
    mutationFn: handleJoin,
    onSuccess: (response) => {
      if (response.message === "이미 가입된 이메일입니다") {
        openModal({
          type: "error",
          title: "회원가입 실패",
          content: response.message,
          onConfirm: () => {},
        });
        return;
      }
      openModal({
        type: "success",
        title: "회원가입 성공",
        content: "회원가입에 성공했습니다.",
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
};
