import { create } from "zustand";

export const useRecruitmentProcessStore = create((set) => ({
  name: '',
  description: '',
  steps: {
    available: [],
    used: [],
  },

  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setSteps: (steps) => set({ steps }),

  setRecruitmentProcess: (process) =>
    set({
      name: process?.name ?? '',
      description: process?.description ?? '',
      steps: process?.steps ?? {
        used: [],
        available: []
      }
    }),

  reset: () => set({ 
    name: '', 
    description: '', 
    steps: {
      available: [],
      used: [],
    }
  }),
}));