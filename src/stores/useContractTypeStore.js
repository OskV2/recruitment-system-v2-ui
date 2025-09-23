import { create } from "zustand";

export const useContractTypeStore = create((set) => ({
  name: '',
  description: '',

  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),

  setContractType: (location) =>
    set({
      name: location?.name ?? '',
      description: location?.description ?? '',
    }),

  reset: () => set({ name: '', description: '' }),
}));