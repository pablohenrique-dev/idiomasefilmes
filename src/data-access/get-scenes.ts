import { prisma } from "@/prisma";
import { Scene } from "@prisma/client";

interface Data {
  scenes: Scene[];
  amount?: number;
}

interface GetScenesDataResponse {
  data: Data | null;
  error: string | null;
}

export async function getScenesData(): Promise<GetScenesDataResponse> {
  try {
    const scenes = await prisma.scene.findMany();

    return { data: { scenes }, error: null };
  } catch {
    return { data: null, error: "Ocorreu um erro" };
  }
}
