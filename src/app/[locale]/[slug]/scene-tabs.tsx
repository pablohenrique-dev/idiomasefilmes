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

const tabItens = [
  {
    label: "Script",
    value: "script",
  },
  {
    label: "Questões",
    value: "questoes",
  },
];

interface SceneTabsProps {
  script: string;
  questions: IQuestion[];
}

export function SceneTabs({ script, questions }: SceneTabsProps) {
  return (
    <TabsWrapper defaultValue={tabItens[0].value} className="mt-8 w-full">
      <TabsList className="grid w-full grid-cols-2 gap-2 border bg-transparent md:w-fit">
        {tabItens.map(({ value, label }) => (
          <TabsTrigger
            className="bg-[#F5F5F5] text-black data-[state=active]:bg-black data-[state=active]:text-white"
            key={value}
            value={value}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="script" className="animate-fade-in">
        <Script script={script} />
      </TabsContent>
      <TabsContent value="questoes" className="flex animate-fade-in flex-col">
        <Questions questions={questions} />
      </TabsContent>
    </TabsWrapper>
  );
}
