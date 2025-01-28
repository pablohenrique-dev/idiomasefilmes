import { prisma } from "@/prisma";
import { Question, Scene } from "@prisma/client";

interface SceneWithRelations extends Scene {
  LikedScene: { id: string }[];
  Question: Question[];
}

interface SceneWithLikeInfo extends Omit<SceneWithRelations, "LikedScene"> {
  isLiked: boolean;
}
interface GetScenesDataResponse {
  data: SceneWithLikeInfo | null;
  error: string | null;
}

export async function getSceneData(
  slug: string,
  userId?: string,
): Promise<GetScenesDataResponse> {
  try {
    const scene = await prisma.scene.findUnique({
      where: {
        slug,
      },
      include: {
        LikedScene: userId
          ? {
              where: { userId },
              select: { id: true },
            }
          : false,
        Question: true,
      },
    });

    if (scene) {
      const isLiked = userId ? scene.LikedScene.length > 0 : false;

      return { data: { ...scene, isLiked }, error: null };
    } else {
      return { data: null, error: "Cena não encontrada" };
    }
  } catch {
    return { data: null, error: "Ocorreu um erro" };
  }
}
