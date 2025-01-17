import { auth } from "@/auth";
import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSceneData } from "@/data-access/get-scene";
import { getScenesData } from "@/data-access/get-scenes";
import { flags } from "@/utils/constants/flags";
import dayjs from "dayjs";
import { ScrollText } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteSceneButton } from "./delete-scene-button";

interface ScenePageParams {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function ScenePage({ params }: ScenePageParams) {
  const session = await auth();

  const { data: scene } = await getSceneData(params.slug);
  const { data } = await getScenesData({ slug: scene?.slug });

  const t = await getTranslations("SingleScenePage");
  const t2 = await getTranslations("Components");

  if (!scene) return notFound();
  return (
    <main>
      <div className="container my-8 grid grid-cols-1 gap-6 sm:my-10 md:grid-cols-6">
        <aside className="col-span-2 animate-fade-left">
          <div className="sticky top-8">
            <p className="text-base">{scene.source}</p>
            <h1 className="mb-1 text-2xl font-semibold">{scene.title}</h1>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-2">
                {scene.accent.map((accent) => {
                  return (
                    <Image
                      key={accent}
                      src={flags[accent as keyof typeof flags]}
                      alt={`${accent} flag`}
                      width={30}
                      height={10}
                      title={`${accent} flag`}
                      className={"h-auto w-[26px]"}
                    />
                  );
                })}
                <span>•</span>
                <span className="flex aspect-square w-[22px] items-center justify-center rounded-[2px] text-sm uppercase">
                  {scene.level}
                </span>
              </div>
              <span>•</span>
              <p className="text-base">
                {dayjs(scene.createdAt).format("DD/MM/YYYY")}
              </p>
            </div>
            {session?.user.role === "ADMIN" && (
              <div className="flex items-center gap-3">
                <Button variant="secondary" asChild>
                  <Link href={`/${params.locale}/edit-scene/${scene.slug}`}>
                    {t2("Button.edit")}
                  </Link>
                </Button>
                <Separator
                  className="h-8 w-[1px] bg-black"
                  orientation="vertical"
                />
                <DeleteSceneButton locale={params.locale} slug={scene.slug} />
              </div>
            )}
          </div>
        </aside>
        <section className="col-span-4 animate-fade-right">
          <iframe
            className="aspect-video w-full overflow-hidden rounded"
            src={scene.scene_url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="mt-8 rounded border border-gray-200">
            <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-3">
              <div className="flex aspect-square w-8 items-center justify-center rounded border border-gray-400 bg-black">
                <ScrollText className="w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Script</h3>
            </div>
            <div
              className="p-5"
              dangerouslySetInnerHTML={{ __html: scene.script }}
            ></div>
          </div>
        </section>
      </div>
      <section className="container mb-8 animate-fade-top">
        <h2 className="mb-3 text-xl font-semibold sm:text-2xl">
          {t("listTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {data &&
            data.scenes.map((scene) => {
              return <Card key={scene.id} locale={params.locale} {...scene} />;
            })}
        </div>
      </section>
    </main>
  );
}
