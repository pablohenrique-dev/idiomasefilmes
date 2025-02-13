"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

const messages = {
  success: {
    pt: "Cena deletada com sucesso",
    en: "Scene deleted successfully",
    es: "Escena eliminada con éxito",
  },
  error: {
    unknown: {
      pt: "Ocorreu um erro ao deletar a cena. Tente novamente!",
      en: "An error occurred while deleting the scene. Please try again!",
      es: "Se produjo un error al eliminar la escena. ¡Intentar otra vez!",
    },
  },
};

export async function deleteSceneAction(slug: string, locale: string) {
  try {
    await prisma.scene.delete({
      where: {
        slug,
      },
    });

    revalidatePath("/[locale]", "page");

    return [messages.success[locale as "pt" | "en" | "es"], null];
  } catch {
    return [null, messages.error.unknown[locale as "pt" | "en" | "es"]];
  }
}
