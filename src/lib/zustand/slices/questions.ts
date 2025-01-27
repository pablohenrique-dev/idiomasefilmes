import { Question } from "@/@types/question";
import { StateCreator } from "zustand";
import { sliceResetFns, StoreSlices } from "../use-bound-store";

export interface QuestionsSlice {
  questions: Omit<Question, "authorId" | "sceneId">[];
  setQuestions: (questions: Omit<Question, "authorId" | "sceneId">[]) => void;
}

const initialState: Omit<Question, "authorId" | "sceneId">[] = [];

export const questionsSlice: StateCreator<
  StoreSlices,
  [],
  [],
  QuestionsSlice
> = (set) => {
  sliceResetFns.add(() => set({ questions: initialState }));
  return {
    questions: initialState,
    setQuestions: (questions) => set(() => ({ questions })),
  };
};
