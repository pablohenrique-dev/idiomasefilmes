import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { stepSlice, StepSlice } from "./slices/step";
import { sceneSlice, SceneSlice } from "./slices/scene";
import { questionsSlice, QuestionsSlice } from "./slices/questions";

export type StoreSlices = StepSlice & SceneSlice & QuestionsSlice;

export const sliceResetFns = new Set<() => void>();

export const resetAllSlices = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn();
  });
};

export const useBoundStore = create<StoreSlices>()(
  persist(
    (...a) => ({
      ...stepSlice(...a),
      ...sceneSlice(...a),
      ...questionsSlice(...a),
    }),
    {
      name: "scene-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
