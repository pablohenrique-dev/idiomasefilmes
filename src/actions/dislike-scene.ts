"use server";

import { prisma } from "@/prisma";

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

export async function dislikeSceneAction(
  userId: string,
  sceneId: string,
  locale: string,
) {
  try {
    await prisma.likedScene.delete({
      where: {
        userId_sceneId: { userId, sceneId },
      },
    });

    return [messages.success[locale as "pt" | "en" | "es"], null];
  } catch {
    return [null, messages.error.unknown[locale as "pt" | "en" | "es"]];
  }
}
