import { getTranslations } from "next-intl/server";
// import { LevelFilter } from "./level-filter";
import { Card } from "@/components/card";
import { getScenesData } from "@/data-access/get-scenes";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("HomePage");
  const { data } = await getScenesData({});

  return (
    <>
      <main className="container flex flex-col items-center justify-center py-20">
        <h1 className="max-w-[850px] animate-fade-top text-center text-4xl font-semibold leading-[130%] sm:text-5xl sm:leading-[130%]">
          {t("title")}
        </h1>
      </main>
      {/* <div className="container mb-6 flex h-10 items-center justify-between">
        Filtro
        <LevelFilter />
      </div> */}
      <section className="container mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {data &&
          data.scenes.map((scene) => {
            return <Card key={scene.id} locale={params.locale} {...scene} />;
          })}
      </section>
    </>
  );
}
