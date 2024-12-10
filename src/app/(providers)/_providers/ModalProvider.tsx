"use client";
import Modal from "@/components/common/Modal/Modal";
import useModalStore from "@/zustand/useModalStore";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  const isOpen = useModalStore((state) => state.isOpen);
  return (
    <div>
      {children}
      {isOpen && <Modal />}
    </div>
  );
}

export default ModalProvider;
