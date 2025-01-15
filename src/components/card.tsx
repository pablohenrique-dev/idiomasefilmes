import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { isNew } from "@/utils/is-new";
import { flags } from "@/utils/constants/flags";
import { cn } from "@/lib/utils";

interface CardProps {
  id: string;
  slug: string;
  title: string;
  level: string;
  locale: string;
  source: string;
  createdAt: Date;
  accent: string[];
  thumb_url: string;
}

export function Card({
  id,
  slug,
  level,
  title,
  source,
  locale,
  accent,
  createdAt,
  thumb_url,
}: CardProps) {
  return (
    <Link
      href={`/${locale}/${slug}`}
      key={id}
      className="group relative flex aspect-[9/13] w-full cursor-pointer flex-col justify-end overflow-hidden rounded-md bg-cover bg-center p-4 sm:aspect-[9/14]"
    >
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
        style={{
          backgroundImage: `url(${thumb_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-black from-[1%] to-transparent"></span>
      <div className="absolute right-4 top-4 flex animate-fade-bottom items-center gap-2">
        <span className="flex aspect-square w-[22px] items-center justify-center rounded-[2px] border-[1px] border-[#333] bg-black text-sm uppercase text-white">
          {level}
        </span>
        <Separator className="h-4 w-[1px] bg-white" orientation="vertical" />
        <div className="flex">
          {accent.map((accent, index) => {
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
      {isNew(createdAt) && (
        <span className="absolute left-4 top-4 animate-fade-bottom rounded-[2px] border-[#333] border-[] bg-black px-2 py-[1px] text-sm text-white">
          New
        </span>
      )}

      <div className="z-10 animate-fade-top">
        <h3 className="mb-1 text-wrap text-xl text-white">{title}</h3>
        <p className="text-sm font-light text-white opacity-75">{source}</p>
      </div>
    </Link>
  );
}
