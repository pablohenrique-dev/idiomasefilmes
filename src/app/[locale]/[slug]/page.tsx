import { auth } from "@/auth";
import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSceneData } from "@/data-access/get-scene";
import { getScenesData } from "@/data-access/get-scenes";
import { flags } from "@/utils/constants/flags";
import dayjs from "dayjs";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteSceneButton } from "./delete-scene-button";
import { LikeSceneButton } from "./like-scene-button";
import { SceneTabs } from "./scene-tabs";

interface ScenePageParams {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function ScenePage({ params }: ScenePageParams) {
  const session = await auth();

  const { data: scene } = await getSceneData(params.slug, session?.user.id);
  const { data } = await getScenesData({ slug: scene?.slug });

  const t = await getTranslations("SingleScenePage");
  const t2 = await getTranslations("Components");

  const isUserLogged = () => !!session?.user;
  const isUserAdmin = () => session?.user.role === "ADMIN";

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
            {isUserLogged() && (
              <div className="flex items-center gap-3">
                <LikeSceneButton
                  sceneId={scene.id}
                  userId={session!.user.id}
                  locale={params.locale}
                  isSceneLiked={scene.isLiked}
                />

                {isUserAdmin() && (
                  <>
                    <Separator
                      className="h-8 w-[1px] bg-gray-400"
                      orientation="vertical"
                    />
                    <Button variant="secondary" asChild>
                      <Link href={`/${params.locale}/edit-scene/${scene.slug}`}>
                        {t2("Button.edit")}
                      </Link>
                    </Button>
                    <Separator
                      className="h-8 w-[1px] bg-gray-400"
                      orientation="vertical"
                    />
                    <DeleteSceneButton
                      locale={params.locale}
                      slug={scene.slug}
                    />
                  </>
                )}
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
          <SceneTabs script={scene.script} questions={scene.Question} />
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

export async function generateMetadata({
  params,
}: ScenePageParams): Promise<Metadata> {
  const { data } = await getSceneData(params.slug);

  if (!data) return { title: "Idiomas e filmes" };
  return {
    title: data.title,
    openGraph: {
      images: [
        {
          url: data.thumb_url,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
