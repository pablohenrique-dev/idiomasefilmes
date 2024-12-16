"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useTransition } from "react";

interface Language {
  locale: string;
  label: string;
  flag: string;
}

interface SelectLanguageProps {
  languages: Language[];
  selectDefaultValue?: string;
}

export function SelectLanguage({
  languages,
  selectDefaultValue,
}: SelectLanguageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  function handleSelectChange(locale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: locale });
    });
  }

  return (
    <Select
      onValueChange={handleSelectChange}
      defaultValue={selectDefaultValue}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Selecione um idioma" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languages.map(({ flag, label, locale }) => (
            <SelectItem key={label} value={locale} className="cursor-pointer">
              <div className="flex items-center gap-2">
                <Image
                  src={flag}
                  alt="Flag"
                  width={30}
                  height={10}
                  className="w-[25px] h-auto"
                />
                <span className="block">{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
