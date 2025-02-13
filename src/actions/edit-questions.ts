"use server";

import { prisma } from "@/prisma";
import { Question } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

const messages = {
  success: {
    pt: "Questões atualizadas com sucesso",
    en: "Questions updated successfully",
    es: "Preguntas actualizadas con éxito",
  },
  error: {
    titleAlreadyExists: {
      pt: "Uma questão com o título fornecido já existe",
      en: "A question with the provided title already exists",
      es: "Una pregunta con el título proporcionado ya existe",
    },
    unknown: {
      pt: "Ocorreu um erro ao criar a questão. Tente novamente!",
      en: "An error occurred while creating the question. Please try again!",
      es: "Ocurrió un error al crear la pregunta. ¡Inténtalo de nuevo!",
    },
  },
};

export async function editQuestionsAction(
  data: Question[],
  locale: string,
): Promise<[string | null, string | null]> {
  try {
    await prisma.$transaction(
      data.map((question) =>
        prisma.question.update({
          where: { id: question.id },
          data: {
            options: question.options,
            correctAnswer: question.correctAnswer,
            statement: question.statement,
          },
        }),
      ),
    );

    revalidatePath("/[locale]/[slug]", "page");

    return [messages.success[locale as "pt" | "en" | "es"], null];
  } catch (error) {
    console.error(error);
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
