"use server";

import { Scene } from "@/@types/scene";
import { prisma } from "@/prisma";
import { createSlugFromText } from "@/utils/create-slug-from-text";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const messages = {
  success: {
    pt: "Cena atualizada com sucesso",
    en: "Scene updated successfully",
    es: "Escena actualizado con éxito",
  },
  error: {
    titleAlreadyExists: {
      pt: "Uma cena com o título fornecido já existe",
      en: "A scene with the provided title already exists",
      es: "Una escena con el título proporcionado ya existe",
    },
    unknown: {
      pt: "Ocorreu um erro ao atualizar a cena. Tente novamente!",
      en: "An error occurred while updating the scene. Please try again!",
      es: "Ocurrió un error al actualizar la escena. ¡Inténtalo de nuevo!",
    },
  },
};

export async function updateSceneAction(data: Scene, locale: string) {
  try {
    const slug = createSlugFromText(data.title);

    const sceneData = { slug, ...data };

    await prisma.scene.update({
      data: sceneData,
      where: {
        slug,
      },
    });

    return [messages.success[locale as "pt" | "en" | "es"], null];
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return [
          null,
          messages.error.titleAlreadyExists[locale as "pt" | "en" | "es"],
        ];
      }
    }
    return [null, messages.error.unknown[locale as "pt" | "en" | "es"]];
  }
}
