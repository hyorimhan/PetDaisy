import { create } from "zustand";

type ModalType = "success" | "error" | "warning" | null;

// 모달 옵션을 위한 인터페이스 정의
interface ModalOptions {
  type: ModalType;
  title: string;
  content: string;
  isTwoButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  modalTitle: string;
  modalContent: string;
  isTwoButton: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;

  // 객체 형태의 매개변수를 받는 openModal
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const useMdoalStore = create<ModalStore>((set) => ({
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
  }) =>
    set({
      isOpen: true,
      modalType: type,
      modalTitle: title,
      modalContent: content,
      isTwoButton,
      onConfirm,
      onCancel,
    }),

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

export default useMdoalStore;
