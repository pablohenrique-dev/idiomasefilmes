"use client";

import { Question as IQuestion } from "@/@types/question";
import { Button } from "@/components/ui/button";
import React from "react";
import { Question } from "./question";

interface QuestionsProps {
  questions: IQuestion[];
}

export function Questions({ questions }: QuestionsProps) {
  const [isAnswersVisible, setIsAnswersVisible] = React.useState(false);

  return (
    <>
      {questions.map((question) => (
        <Question
          key={question.statement}
          question={question}
          isAnswerVisible={isAnswersVisible}
        />
      ))}
      <div className="mt-8">
        {isAnswersVisible ? (
          <Button onClick={() => setIsAnswersVisible(false)}>Esconder</Button>
        ) : (
          <Button onClick={() => setIsAnswersVisible(true)}>Mostrar</Button>
        )}
      </div>
    </>
  );
}
