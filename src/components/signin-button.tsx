"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "./ui/button";
import { signinAction } from "@/actions/signin";

export default function SignIn() {
  const t = useTranslations("Components");
  return (
    <Button
      type="submit"
      className="hover:bg-[#5865F2]"
      onClick={() => signinAction()}
    >
      {t("Button.SignIn")}{" "}
      <Image
        src="/discord-icon.svg"
        alt="discord icon"
        width={30}
        height={10}
        className="h-auto w-[18px]"
      />
    </Button>
  );
}
