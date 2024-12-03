import { create } from "zustand";

type ModalType = "success" | "error" | "warning" | null;

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  modalTitle: string;
  modalContent: string;
  isTwoButton: boolean;
  openModal: (modalType: ModalType, modalTitle: string, modalContent: string, isTwoButton: boolean) => void;
  closeModal: () => void;
}
const useMdoalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  modalTitle: "",
  modalContent: "",
  isTwoButton: false,
  openModal: (modalType: ModalType, modalTitle: string, modalContent: string, isTwoButton: boolean) =>
    set({ isOpen: true, modalType, modalTitle, modalContent, isTwoButton }),
  closeModal: () => set({ isOpen: false, modalType: null, modalTitle: "", modalContent: "", isTwoButton: false }),
}));
export default useMdoalStore;
