import { useTranslations } from "next-intl";
import { z } from "zod";

export const createSceneFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    title: z.string().min(1, { message: t("form.title.lengthErrorMessage") }),
    script: z.string().min(1, { message: t("form.script.lengthErrorMessage") }),
    thumb_url: z
      .string()
      .min(1, { message: t("form.thumb.lengthErrorMessage") }),
    scene_url: z
      .string()
      .min(1, { message: t("form.scene.lengthErrorMessage") }),
    source: z.string().min(1, { message: t("form.origin.lengthErrorMessage") }),
    genre: z.array(z.string(), { message: t("form.genre.lengthErrorMessage") }),
    level: z.string().min(1, { message: t("form.level.lengthErrorMessage") }),
    accent: z.array(z.string(), {
      message: t("form.accent.lengthErrorMessage"),
    }),
  });

export type CreateSceneFormType = z.infer<
  ReturnType<typeof createSceneFormSchema>
>;
