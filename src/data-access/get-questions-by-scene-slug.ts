import { prisma } from "@/prisma";
import { Question } from "@prisma/client";

interface GetQuestionsBySceneIdDataResponse {
  data: Question[] | null;
  error: string | null;
}

export async function getQuestionsBySceneIdData(
  sceneId: string,
): Promise<GetQuestionsBySceneIdDataResponse> {
  try {
    const questions = await prisma.question.findMany({
      where: {
        sceneId,
      },
    });

    return { data: questions, error: null };
  } catch {
    return { data: null, error: "Ocorreu um erro" };
  }
}
