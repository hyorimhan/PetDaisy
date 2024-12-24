import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type userAuthStoreType = {
  user: User | null;
  saveUser: (userInfo: User | null) => void;
  initial: boolean;
};

export const useAuthStore = create<userAuthStoreType>((set) => ({
  user: null,
  initial: false,
  saveUser: (userInfo) => set({ user: userInfo, initial: true }),
}));
