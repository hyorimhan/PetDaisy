import { create } from "zustand";

type userPetStoreType = {
  petId: string | null;
  petName: string | null;
  savePet: (petId: string, petName: string) => void;
};

export const usePetStore = create<userPetStoreType>((set) => ({
  petId: null,
  petName: null,
  savePet: (petId, petName) => set({ petId: petId, petName: petName }),
}));
