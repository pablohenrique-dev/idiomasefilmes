import { useTranslations } from "next-intl";
import { z } from "zod";

export const sceneFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    title: z.string().min(1, { message: t("scene.title.lengthErrorMessage") }),
    script: z
      .string()
      .min(1, { message: t("scene.script.lengthErrorMessage") }),
    thumb_url: z
      .string()
      .min(1, { message: t("scene.thumb.lengthErrorMessage") }),
    scene_url: z
      .string()
      .min(1, { message: t("scene.scene.lengthErrorMessage") }),
    source: z
      .string()
      .min(1, { message: t("scene.origin.lengthErrorMessage") }),
    genre: z.array(z.string(), {
      message: t("scene.genre.lengthErrorMessage"),
    }),
    level: z.string().min(1, { message: t("scene.level.lengthErrorMessage") }),
    accent: z.array(z.string(), {
      message: t("scene.accent.lengthErrorMessage"),
    }),
  });

export type SceneFormType = z.infer<ReturnType<typeof sceneFormSchema>>;
