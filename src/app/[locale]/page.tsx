import { getTranslations } from "next-intl/server";
import Image from "next/image";
// import { LevelFilter } from "./level-filter";
import { getScenesData } from "@/data-access/get-scenes";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import Link from "next/link";
import { cn } from "@/lib/utils";

const flags = {
  american: "/us.svg",
  british: "/gb.svg",
  other: "/wf.svg",
  australian: "/au.svg",
  "south-african": "/za.svg",
};

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("HomePage");
  const { data } = await getScenesData();

  function isNew(createdAt: Date): boolean {
    return dayjs(createdAt).isAfter(dayjs().subtract(10, "day"));
  }

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
            return (
              <Link
                href={`/${params.locale}/${scene.slug}`}
                key={scene.id}
                className="group relative flex aspect-[9/13] w-full cursor-pointer flex-col justify-end overflow-hidden rounded-md bg-cover bg-center p-4 sm:aspect-[9/14]"
              >
                <div
                  className="absolute inset-0 z-[-1] bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${scene.thumb_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>

                <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-black from-[1%] to-transparent"></span>
                <div className="absolute right-4 top-4 flex animate-fade-bottom items-center gap-2">
                  <span className="flex aspect-square w-[22px] items-center justify-center rounded-[2px] border-[1px] border-[#333] bg-black text-sm text-white">
                    {scene.level}
                  </span>
                  <Separator
                    className="h-4 w-[1px] bg-white"
                    orientation="vertical"
                  />
                  <div className="flex">
                    {scene.accent.map((accent, index) => {
                      return (
                        <Image
                          key={accent}
                          src={flags[accent as keyof typeof flags]}
                          alt={`${accent} flag`}
                          width={30}
                          height={10}
                          title={`${accent} flag`}
                          className={cn(
                            "h-auto w-[26px]",
                            index !== 0 &&
                              "ml-2 transition-all sm:ml-[-20px] sm:group-hover:ml-2",
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
                {isNew(scene.createdAt) && (
                  <span className="absolute left-4 top-4 animate-fade-bottom rounded-[2px] border-[#333] border-[] bg-black px-2 py-[1px] text-sm text-white">
                    New
                  </span>
                )}

                <div className="z-10 animate-fade-top">
                  <h3 className="mb-1 text-wrap text-xl text-white">
                    {scene.title}
                  </h3>
                  <p className="text-sm font-light text-white opacity-75">
                    {scene.source}
                  </p>
                </div>
              </Link>
            );
          })}
      </section>
    </>
  );
}
