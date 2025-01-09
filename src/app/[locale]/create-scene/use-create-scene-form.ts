import { createSceneAction } from "@/actions/create-scene";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  createSceneFormSchema,
  CreateSceneFormType,
} from "./create-scene-schema";

interface useCreateSceneFormParams {
  locale: string;
}

export function useCreateSceneForm({ locale }: useCreateSceneFormParams) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const router = useRouter();

  const t = useTranslations("CreateScenePage");
  const t2 = useTranslations("Components");
  const schema = createSceneFormSchema(t);

  const form = useForm<CreateSceneFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      scene_url: "",
      thumb_url: "",
      script: "",
      source: "",
      genre: undefined,
      accent: undefined,
      level: "",
    },
  });

  async function onSubmit(data: CreateSceneFormType) {
    const [successMessage, errorMessage] = await createSceneAction(
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
