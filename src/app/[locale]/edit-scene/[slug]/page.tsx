import { getSceneData } from "@/data-access/get-scene";
import { SessionProvider } from "next-auth/react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { EditSceneForm } from "./edit-scene-form";

interface EditScenePageParams {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function EditScenePage({ params }: EditScenePageParams) {
  const { data } = await getSceneData(params.slug);
  const t = await getTranslations("ScenePage");

  if (!data) return notFound();
  return (
    <SessionProvider>
      <section className="container">
        <h1 className="mb-3 mt-6 text-center text-2xl font-medium">
          {t("edit.title")}
        </h1>
        <EditSceneForm
          locale={params.locale}
          defaultValues={{
            accent: data.accent,
            genre: data.genre,
            level: data.level,
            scene_url: data.scene_url,
            script: data.script,
            source: data.source,
            thumb_url: data.thumb_url,
            title: data.title,
          }}
        />
      </section>
    </SessionProvider>
  );
}
