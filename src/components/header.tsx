import Image from "next/image";
import { MobileMenu } from "./mobile-menu";
import { SelectLanguage } from "./select-language";
import SignIn from "./signin-button";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "./signout-button";
import { Link } from "@/i18n/routing";

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

const links = {
  pt: ["favoritos"],
  en: ["favorites"],
  es: ["favoritos"],
};

interface HeaderProps {
  locale: string;
}

export default async function Header({ locale: defaultLocale }: HeaderProps) {
  const session = await auth();

  return (
    <header className="animate-fade-bottom">
      <div className="container my-4 flex items-center justify-between">
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
        <div className="hidden items-center gap-2 sm:flex">
          <SelectLanguage
            languages={languages}
            isMobile={false}
            defaultLocale={defaultLocale}
          />
          {session?.user ? (
            <div className="flex items-center gap-4">
              {session.user.image && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer rounded-full">
                    <Image
                      src={session.user.image}
                      alt="Profile image"
                      width={50}
                      height={50}
                      className="w-9 rounded-full"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {links[defaultLocale as keyof typeof links].map((link) => (
                      <DropdownMenuItem key={link}>
                        <Link href={`${defaultLocale}/${link}`}>{link}</Link>
                      </DropdownMenuItem>
                    ))}
                    {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem> */}
                    <DropdownMenuItem>
                      <SignOut />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ) : (
            <SignIn />
          )}
        </div>
        <MobileMenu
          session={session}
          links={links[defaultLocale as keyof typeof links]}
          locale={defaultLocale}
        >
          <SelectLanguage
            languages={languages}
            isMobile={true}
            defaultLocale={defaultLocale}
          />
        </MobileMenu>
      </div>
    </header>
  );
}
