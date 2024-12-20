import { ReactNode } from "react";
import { create } from "zustand";

type ModalType = "success" | "error" | "warning" | null;

// 모달 옵션을 위한 인터페이스 정의
interface ModalOptions {
  type?: ModalType;
  title?: string;
  content?: string | ReactNode;
  isTwoButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalStore {
  isOpen: boolean;
  modalType?: ModalType;
  modalTitle?: string;
  modalContent?: string | ReactNode;
  isTwoButton: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;

  // 객체 형태의 매개변수를 받는 openModal
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  modalTitle: "",
  modalContent: "",
  isTwoButton: false,
  onConfirm: undefined,
  onCancel: undefined,

  // 객체 디스트럭처링을 사용하여 더 명시적인 호출 가능
  openModal: ({
    type,
    title,
    content,
    isTwoButton = false,
    onConfirm,
    onCancel,
  }) => {
    const wrappedOnConfirm = onConfirm
      ? () => {
          onConfirm();
          set((state) => ({ ...state, isOpen: false })); // 확인 버튼 클릭 시 자동으로 모달 닫기
        }
      : undefined;

    const wrappedOnCancel = onCancel
      ? () => {
          onCancel();
          set((state) => ({ ...state, isOpen: false })); // 취소 버튼 클릭 시 자동으로 모달 닫기
        }
      : undefined;

    set({
      isOpen: true,
      modalType: type,
      modalTitle: title,
      modalContent: content,
      isTwoButton,
      onConfirm: wrappedOnConfirm,
      onCancel: wrappedOnCancel,
    });
  },

  closeModal: () =>
    set({
      isOpen: false,
      modalType: null,
      modalTitle: "",
      modalContent: "",
      isTwoButton: false,
      onConfirm: undefined,
      onCancel: undefined,
    }),
}));

export default useModalStore;
