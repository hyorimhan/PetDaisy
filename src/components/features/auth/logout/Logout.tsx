"use client";
import { logout } from "@/service/auth";
import { useAuthStore } from "@/zustand/useAuthStore";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Logout() {
  const { saveUser } = useAuthStore();
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      saveUser(null);
      openModal({
        type: "success",
        title: "로그아웃 성공",
        content: response.message,
        onConfirm: () => {
          router.replace("/");
        },
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "로그아웃 실패",
        content: error.message,
        onConfirm: () => {
          router.replace("/");
        },
      });
    },
  });
  // const logoutFunc = async () => {
  //   const response = await logout();
  //   if (response.error) {
  //     alert(response.error);
  //   }
  //   saveUser(null);
  //   alert(response.message);
  // };
  return (
    <button onClick={() => logoutMutation.mutate()}>
      <Image
        src={"/icon/login.svg"}
        alt="home"
        width={20}
        height={20}
        className="mx-auto w-5 h-5 "
      />
      로그아웃
    </button>
  );
}

export default Logout;
