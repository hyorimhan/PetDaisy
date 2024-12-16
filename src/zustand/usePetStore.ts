import { create } from "zustand";

type userPetStoreType = {
  petId: string | null;
  petName: string | null;
  savePet: (petId: string | null, petName: string | null) => void;
  resetPet: () => void;
};

export const usePetStore = create<userPetStoreType>((set) => ({
  petId: null,
  petName: null,
  savePet: (petId, petName) => set({ petId: petId, petName: petName }),
  resetPet: () => set({ petId: null, petName: null }),
}));
