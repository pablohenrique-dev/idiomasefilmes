import { StateCreator } from "zustand";
import { sliceResetFns, StoreSlices } from "../use-bound-store";

interface Step {
  currentStep: number;
  lastFilledStep: number;
}

export interface StepSlice {
  step: Step;
  setLastFilledStep: (step: number) => void;
  setCurrentStep: (step: number) => void;
}

const initialState: Step = {
  currentStep: 0,
  lastFilledStep: 0,
};

export const stepSlice: StateCreator<StoreSlices, [], [], StepSlice> = (
  set,
) => {
  sliceResetFns.add(() => set({ step: initialState }));

  return {
    step: initialState,
    setCurrentStep: (currentStep: number) =>
      set((state) => ({ step: { ...state.step, currentStep } })),
    setLastFilledStep: (lastFilledStep: number) =>
      set((state) => ({ step: { ...state.step, lastFilledStep } })),
  };
};
