"use client";

import React from "react";
import { Script } from "./script";
import {
  Tabs as TabsWrapper,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Question as IQuestion } from "@/@types/question";
import { Questions } from "./questions";
import { User } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useTranslations } from "next-intl";

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
  user?: {
    id: string;
    role: "ADMIN" | "USER";
  } & User;
}

export function SceneTabs({ script, questions }: SceneTabsProps) {
  const t = useTranslations("SingleScenePage");

  return (
    <TabsWrapper defaultValue={tabItens[0].value} className="mt-8 w-full">
      <TabsList className="grid w-full grid-cols-2 gap-2 border bg-transparent md:w-fit">
        {tabItens.map(({ value, label }) => (
          <TabsTrigger
            className="bg-[#F5F5F5] text-black data-[state=active]:bg-black data-[state=active]:text-white"
            key={value}
            value={value}
          >
            {label(t)}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="script" className="animate-fade-in">
        <Script script={script} />
      </TabsContent>
      <TabsContent value="questions" className="flex animate-fade-in flex-col">
        <SessionProvider>
          <Questions questions={questions} />
        </SessionProvider>
      </TabsContent>
    </TabsWrapper>
  );
}
