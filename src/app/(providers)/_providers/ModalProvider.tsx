"use client";
import Modal from "@/components/common/Modal/Modal";
import useMdoalStore from "@/zustand/modalStore";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  const isOpen = useMdoalStore((state) => state.isOpen);
  return (
    <div>
      {children}
      {isOpen && <Modal />}
    </div>
  );
}

export default ModalProvider;
