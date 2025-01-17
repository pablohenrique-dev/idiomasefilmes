import { prisma } from "@/prisma";
import { Scene } from "@prisma/client";

interface Data {
  scenes: Scene[];
  amount?: number;
}

interface getScenesDataParams {
  slug?: string;
  take?: number;
}

interface GetScenesDataResponse {
  data: Data | null;
  error: string | null;
}

export async function getScenesData({
  slug,
  take,
}: getScenesDataParams): Promise<GetScenesDataResponse> {
  try {
    const scenes = await prisma.scene.findMany({
      where: {
        slug: {
          not: slug,
        },
      },
      take,
    });

    return { data: { scenes, amount: scenes.length }, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Ocorreu um erro ao buscar as cenas." };
  }
}
