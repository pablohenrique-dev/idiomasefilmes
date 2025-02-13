"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

const messages = {
  success: {
    pt: "Cena curtida com sucesso",
    en: "Scene liked successfully",
    es: "Escena gustada con éxito",
  },
  error: {
    unknown: {
      pt: "Ocorreu um erro ao curtir a cena. Tente novamente!",
      en: "An error occurred while liking the scene. Please try again!",
      es: "Ocurrió un error al gustar la escena. ¡Inténtalo de nuevo!",
    },
  },
};

export async function likeSceneAction(
  userId: string,
  sceneId: string,
  locale: string,
) {
  try {
    await prisma.likedScene.create({
      data: {
        sceneId,
        userId,
      },
    });

    revalidatePath("/[locale]/[slug]", "page");

    return [messages.success[locale as "pt" | "en" | "es"], null];
  } catch {
    return [null, messages.error.unknown[locale as "pt" | "en" | "es"]];
  }
}
