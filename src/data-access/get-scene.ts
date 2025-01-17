import { prisma } from "@/prisma";
import { Scene } from "@prisma/client";

interface GetScenesDataResponse {
  data: Scene | null;
  error: string | null;
}

export async function getSceneData(
  slug: string,
): Promise<GetScenesDataResponse> {
  try {
    const scene = await prisma.scene.findUnique({
      where: {
        slug,
      },
    });

    if (scene) {
      return { data: scene, error: null };
    } else {
      return { data: null, error: "Cena não encontrada" };
    }
  } catch {
    return { data: null, error: "Ocorreu um erro" };
  }
}
