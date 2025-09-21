import { create } from "zustand";

export const useLocationStore = create((set) => ({
  name: '',
  description: '',

  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),

  setLocation: (location) =>
    set({
      name: location?.name ?? '',
      description: location?.description ?? '',
    }),

  // optional: clear store after submit/cancel
  reset: () => set({ name: '', description: '' }),
}));