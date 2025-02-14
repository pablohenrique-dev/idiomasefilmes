"use client";

import { Question as IQuestion } from "@/@types/question";
import {
  TabsContent,
  TabsList,
  TabsTrigger,
  Tabs as TabsWrapper,
} from "@/components/ui/tabs";
import { SessionProvider } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Questions } from "./questions";
import { Script } from "./script";

const tabItens = [
  {
    label: (t: ReturnType<typeof useTranslations>) => t("tabs.buttons.script"),
    value: "script",
  },
  {
    label: (t: ReturnType<typeof useTranslations>) =>
      t("tabs.buttons.questions"),
    value: "questions",
  },
];

interface SceneTabsProps {
  script: string;
  questions: IQuestion[];
  sceneSlug: string;
}

export function SceneTabs({ script, questions, sceneSlug }: SceneTabsProps) {
  const t = useTranslations("SingleScenePage");
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabDefaultValue = searchParams.get("active-tab") || tabItens[0].value;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("active-tab", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <TabsWrapper defaultValue={tabDefaultValue} className="mt-8 w-full">
      <TabsList className="grid w-full grid-cols-2 gap-2 border bg-transparent md:w-fit">
        {tabItens.map(({ value, label }) => {
          if (value === "questions" && questions.length === 0) return null;
          return (
            <TabsTrigger
              className="bg-[#F5F5F5] text-black data-[state=active]:bg-black data-[state=active]:text-white"
              key={value}
              value={value}
              onClick={() => handleTabChange(value)}
            >
              {label(t)}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent value="script" className="animate-fade-in">
        <Script script={script} />
      </TabsContent>
      {!!questions.length && (
        <TabsContent
          value="questions"
          className="flex animate-fade-in flex-col"
        >
          <SessionProvider>
            <Questions questions={questions} sceneSlug={sceneSlug} />
          </SessionProvider>
        </TabsContent>
      )}
    </TabsWrapper>
  );
}
