"use client";

import Image from "next/image";
import { Button } from "./button";
import { SelectLanguage } from "./select-language";

const languages = [
  {
    locale: "pt",
    label: "Português",
    flag: "/br.svg",
  },
  {
    locale: "en",
    label: "English",
    flag: "/us.svg",
  },
  {
    locale: "es",
    label: "Español",
    flag: "/es.svg",
  },
];

interface HeaderProps {
  locale: string;
}

export default function Header({ locale: defaultLocale }: HeaderProps) {
  return (
    <header>
      <div className="container flex justify-between my-4 items-center">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Logo" width={28} height={28} />
          <h1 className="font-bold text-lg">IDIOMAS E FILMES</h1>
        </div>
        <div className="flex items-center gap-2">
          <SelectLanguage
            languages={languages}
            selectDefaultValue={defaultLocale}
          />
          <Button variant="default">Criar conta</Button>
        </div>
      </div>
    </header>
  );
}
