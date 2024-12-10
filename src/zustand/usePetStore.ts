import { create } from "zustand";

type userPetStoreType = {
  petId: string | null;
  savePetId: (petId: string) => void;
};

export const usePetStore = create<userPetStoreType>((set) => ({
  petId: null,
  savePetId: (petId) => set({ petId: petId }),
}));
