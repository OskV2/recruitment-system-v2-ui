import { create } from "zustand";

export const useRecruitmentStepStore = create((set) => ({
  name: '',
  description: '',
  requiresInterview: false,

  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setRequiresInterview: (requiresInterview) => set({ requiresInterview }),

  setRecruitmentStep: (recruitmentStep) =>
    set({
      name: recruitmentStep?.name ?? '',
      description: recruitmentStep?.description ?? '',
      requiresInterview: recruitmentStep?.requiresInterview ?? false
    }),

  reset: () => set({ name: '', description: '', requiresInterview: false }),
}));