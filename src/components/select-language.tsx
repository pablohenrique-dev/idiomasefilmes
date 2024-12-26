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
} from "./ui/select";
import { useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface Language {
  locale: string;
  label: string;
  flag: string;
}

interface SelectLanguageProps {
  languages: Language[];
  defaultLocale?: string;
  isMobile: boolean;
}

export function SelectLanguage({
  languages,
  isMobile,
  defaultLocale,
}: SelectLanguageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const t = useTranslations("Components");

  function handleSelectChange(locale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: locale });
    });
  }

  return (
    <>
      {isMobile ? (
        <div className="mb-8 flex flex-col gap-3">
          <span>{t("SelectLanguageLabel")}</span>
          <RadioGroup
            defaultValue={defaultLocale}
            onValueChange={handleSelectChange}
            className="flex flex-wrap gap-4"
          >
            {languages.map(({ flag, label, locale }) => (
              <div key={label} className="flex items-center space-x-2">
                <RadioGroupItem value={locale} id={locale} />

                <Label
                  htmlFor={locale}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Image
                    src={flag}
                    alt="Flag"
                    width={30}
                    height={10}
                    className="h-auto w-[25px]"
                  />{" "}
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ) : (
        <Select onValueChange={handleSelectChange} defaultValue={defaultLocale}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Selecione um idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {languages.map(({ flag, label, locale }) => (
                <SelectItem
                  key={label}
                  value={locale}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={flag}
                      alt="Flag"
                      width={30}
                      height={10}
                      className="h-auto w-[25px]"
                    />
                    <span className="block">{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  );
}
