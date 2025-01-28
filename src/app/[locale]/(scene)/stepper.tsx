"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface StepperProps {
  locale?: string;
}

export function Stepper({ locale }: StepperProps) {
  const t = useTranslations("ScenePage");
  const pathname = usePathname();

  const steps = [
    {
      href: `/${locale}/create-scene`,
      label: "Cena",
    },
    {
      href: `/${locale}/create-questions`,
      label: "Questões",
    },
  ];

  return (
    <div className="mx-auto my-8 flex w-fit items-center justify-center gap-1 rounded border p-1">
      {steps.map(({ label, href }) => (
        <Link
          key={label}
          className={cn(
            "rounded px-2 py-1",
            href === pathname
              ? "bg-black text-white"
              : "bg-[#F5F5F5] text-black hover:bg-[#bababa]",
          )}
          href={href}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
