"use client";

import { Question as IQuestion } from "@/@types/question";
import { Button } from "@/components/ui/button";
import React from "react";
import { Question } from "./question";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface QuestionsProps {
  questions: IQuestion[];
  sceneSlug: string;
}

export function Questions({ questions, sceneSlug }: QuestionsProps) {
  const [isAnswersVisible, setIsAnswersVisible] = React.useState(false);
  const { data: session } = useSession();

  const t = useTranslations("SingleScenePage");

  return (
    <>
      {questions.map((question) => (
        <Question
          key={question.statement}
          question={question}
          isAnswerVisible={isAnswersVisible}
        />
      ))}
      <div className="mt-8 flex items-center gap-4">
        {isAnswersVisible ? (
          <Button onClick={() => setIsAnswersVisible(false)}>
            {t("tabs.buttons.hide")}
          </Button>
        ) : (
          <Button onClick={() => setIsAnswersVisible(true)}>
            {t("tabs.buttons.show")}
          </Button>
        )}
        {questions && session && session.user.role === "ADMIN" && (
          <Button asChild variant="outline">
            <Link
              href={`/pt/edit-questions/${questions[0].sceneId}?scene-slug=${sceneSlug}`}
            >
              {t("tabs.buttons.edit-questions")}
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
