import { create } from "zustand";

export const useAuthStore = create((set) => ({
  email: "",
  password: "",
  loggedUser: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setLoggedUser: (loggedUser) => set({ loggedUser }),
}));