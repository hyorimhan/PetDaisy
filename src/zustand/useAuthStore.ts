import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type userAuthStoreType = {
  user: User | null;
  saveUser: (userInfo: User | null) => void;
};

export const useAuthStore = create<userAuthStoreType>((set) => ({
  user: null,
  saveUser: (userInfo) => set({ user: userInfo }),
}));
