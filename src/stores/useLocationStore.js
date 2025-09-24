import { create } from "zustand";

export const useLocationStore = create((set) => ({
  country: '',
  city: '',
  description: '',

  setCountry: (country) => set({ country }),
  setCity: (city) => {{ city }},
  setDescription: (description) => set({ description }),

  setLocation: (location) =>
    set({
      country: location?.country ?? '',
      city: location?.city ?? '',
      description: location?.description ?? '',
    }),

  // optional: clear store after submit/cancel
  reset: () => set({ country: '', city: '', description: '' }),
}));