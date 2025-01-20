import { prisma } from "@/prisma";
import { Scene } from "@prisma/client";

interface SceneWithLikeInfo extends Scene {
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
