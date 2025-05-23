import { create } from 'zustand';

interface OnboardingState {
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  isOnboardingComplete: false,
  completeOnboarding: () => set({ isOnboardingComplete: true }),
  resetOnboarding: () => set({ isOnboardingComplete: false }),
}));