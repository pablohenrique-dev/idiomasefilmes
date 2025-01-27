import { Scene } from "@/@types/scene";
import { StateCreator } from "zustand";
import { sliceResetFns, StoreSlices } from "../use-bound-store";

export interface SceneSlice {
  scene: Scene;
  setScene: (scene: Scene) => void;
}

const initialState: Scene = {
  authorId: "",
  accent: undefined,
  genre: undefined,
  level: "",
  scene_url: "",
  script: "",
  source: "",
  thumb_url: "",
  title: "",
};

export const sceneSlice: StateCreator<StoreSlices, [], [], SceneSlice> = (
  set,
) => {
  sliceResetFns.add(() => set({ scene: initialState }));
  return {
    scene: initialState,
    setScene: (scene: Scene) => set(() => ({ scene })),
  };
};
