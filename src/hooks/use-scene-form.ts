import { Scene } from "@/@types/scene";
import { useToast } from "@/hooks/use-toast";
import { sceneFormSchema, sceneFormType } from "@/schemas/scene-form-schema";
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
  action: (data: Scene, locale: string) => Promise<(string | null)[]>;
}

export function useSceneForm({
  locale,
  defaultValues: {
    accent,
    genre,
    level,
    scene_url,
    script,
    source,
    thumb_url,
    title,
  },
  action,
}: useSceneFormParams) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const router = useRouter();

  const t = useTranslations("ScenePage");
  const t2 = useTranslations("Components");
  const schema = sceneFormSchema(t);

  const form = useForm<sceneFormType>({
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

  async function onSubmit(data: sceneFormType) {
    const [successMessage, errorMessage] = await action(
      {
        authorId: session!.user.id,
        ...data,
      },
      locale,
    );
    if (successMessage) {
      toast({ title: successMessage });
      router.push("/");
    } else if (errorMessage) {
      toast({ title: errorMessage, variant: "destructive" });
    }
  }

  return { onSubmit, toast, t, t2, form };
}
