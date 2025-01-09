"use client";

import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Session } from "next-auth";
import { SignOut } from "./signout-button";
import SignIn from "./signin-button";
import { Link } from "@/i18n/routing";
import { Separator } from "./ui/separator";

interface MobileMenuProps {
  locale: string;
  links: string[];
  session: Session | null;
  children: React.ReactNode;
}

export function MobileMenu({
  links,
  locale,
  session,
  children,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations("Components");

  function handleOpenMenu() {
    setIsOpen(true);
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  return (
    <div className="block sm:hidden">
      <Button
        variant="ghost"
        className="flex flex-col gap-1"
        onClick={handleOpenMenu}
      >
        <span className="h-[2px] w-5 bg-black"></span>
        <span className="h-[2px] w-5 bg-black"></span>
        <span className="h-[2px] w-5 bg-black"></span>
      </Button>

      <div
        className={cn(
          isOpen
            ? "fixed left-0 top-0 z-50 flex min-h-screen min-w-full flex-col items-end bg-white p-4"
            : "hidden",
        )}
      >
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={28}
              height={28}
              className="aspect-square w-6 sm:w-[28px]"
            />
            <h1 className="text-base font-bold sm:text-lg">IDIOMAS E FILMES</h1>
          </Link>
          <Button variant="ghost" onClick={handleCloseMenu}>
            {t("Button.close")}
          </Button>
        </div>
        <div className="flex w-full flex-1 flex-col justify-between gap-4">
          <div className="flex flex-col">
            {links.map((link) => (
              <Link key={link} href={`${locale}/${link}`}>
                {link}
              </Link>
            ))}
          </div>
          <div>
            <Separator className="my-6" />
            {children}
            <Separator className="my-6" />
            {session?.user ? <SignOut /> : <SignIn />}
          </div>
        </div>
      </div>
    </div>
  );
}
