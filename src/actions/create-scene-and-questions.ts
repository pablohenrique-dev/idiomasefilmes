"use server";

import { Scene } from "@/@types/scene";
import { Question } from "@/@types/question";
import { prisma } from "@/prisma";
import { createSlugFromText } from "@/utils/create-slug-from-text";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

const messages = {
  success: {
    pt: "Cena criada com sucesso",
    en: "Scene created successfully",
    es: "Escena creada con éxito",
  },
  error: {
    titleAlreadyExists: {
      pt: "Uma cena com o título fornecido já existe",
      en: "A scene with the provided title already exists",
      es: "Una escena con el título proporcionado ya existe",
    },
    unknown: {
      pt: "Ocorreu um erro ao criar a cena. Tente novamente!",
      en: "An error occurred while creating the scene. Please try again!",
      es: "Ocurrió un error al crear la escena. ¡Inténtalo de nuevo!",
    },
  },
};

export async function createSceneAndQuestionsAction(
  data: Scene,
  questions: Omit<Question, "sceneId" | "id">[],
  locale: string,
): Promise<[string | null, string | null]> {
  try {
    const sceneData = { slug: createSlugFromText(data.title), ...data };

    await prisma.$transaction(
      async (prisma) => {
        const createdScene = await prisma.scene.create({
          data: sceneData,
        });

        const questionsData = questions.map((question) => ({
          ...question,
          sceneId: createdScene.id,
        }));

        await prisma.question.createMany({
          data: questionsData,
        });

        return createdScene.id;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );

    revalidatePath("/[locale]", "page");

    return [messages.success[locale as "pt" | "en" | "es"], null];
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error);
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
