import { useToast } from "@/hooks/use-toast";
import { useBoundStore } from "@/lib/zustand/use-bound-store";
import { sceneFormSchema, SceneFormType } from "@/schemas/scene-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export interface DefaultValues {
  title: string | undefined;
  scene_url: string | undefined;
  thumb_url: string | undefined;
  script: string | undefined;
  source: string | undefined;
  genre: string[] | undefined;
  accent: string[] | undefined;
  level: string | undefined;
}

interface useSceneFormParams {
  locale: string;
  defaultValues: DefaultValues;
}

export function useSceneForm({
  locale,
  defaultValues: {
    level,
    title,
    genre,
    script,
    source,
    accent,
    scene_url,
    thumb_url,
  },
}: useSceneFormParams) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const router = useRouter();

  const t = useTranslations("Form");
  const schema = sceneFormSchema(t);
  const { setScene } = useBoundStore((state) => state);

  const form = useForm<SceneFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: title ?? "",
      scene_url: scene_url ?? "",
      thumb_url: thumb_url ?? "",
      script: script ?? "",
      source: source ?? "",
      genre: genre ?? undefined,
      accent: accent ?? undefined,
      level: level ?? "",
    },
  });

  async function onSubmit(data: SceneFormType) {
    const scene = { authorId: session!.user.id, ...data };
    setScene(scene);
    router.push(`/${locale}/create-questions`);
  }

  return { onSubmit, toast, t, form };
}
