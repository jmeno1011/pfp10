import { create } from "zustand";
import { persist } from 'zustand/middleware';

type AuthStore = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      login: (username) => set({ user: username }),
      logout: () => set({ user: null }),
    }),
    {
      name: "pfp10-id"
    }
  )
);

export default useAuthStore;