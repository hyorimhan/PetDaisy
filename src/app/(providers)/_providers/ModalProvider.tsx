"use client";
import ImageModal from "@/components/common/Modal/ImageModal";
import Modal from "@/components/common/Modal/Modal";
import useModalStore from "@/zustand/useModalStore";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  const isOpen = useModalStore((state) => state.isOpen);
  const type = useModalStore((state) => state.modalType);
  return (
    <div>
      {children}
      {isOpen && type && <Modal />}
      {isOpen && !type && <ImageModal />}
    </div>
  );
}

export default ModalProvider;
