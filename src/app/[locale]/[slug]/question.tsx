"use client";

import { Question as IQuestion } from "@/@types/question";
import { Check, X } from "lucide-react";
import React from "react";

interface QuestionProps {
  question: IQuestion;
  isAnswerVisible: boolean;
}

export function Question({ question, isAnswerVisible }: QuestionProps) {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null,
  );

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="mt-8">
      <h3 className="mb-3 font-semibold">{question.statement}</h3>
      <div className="space-y-2">
        {question.options?.map((option, index) => {
          const isCorrect = question.correctAnswer === index;
          const isSelected = selectedOption === option;
          const isWrongSelection = isSelected && !isCorrect;

          return (
            <label key={index} className="relative flex items-center space-x-2">
              <input
                type="radio"
                name={`question-option-${question.id}`}
                value={option}
                checked={isSelected}
                onChange={() => handleOptionChange(option)}
                disabled={isAnswerVisible}
                className="radio-input select"
              />
              <span>{option}</span>

              {/* Exibe o Check apenas na alternativa correta */}
              {isCorrect && isAnswerVisible && (
                <span className="rounded bg-green-200 p-[2px]">
                  <Check className="size-4 text-green-800" />
                </span>
              )}

              {/* Exibe o X apenas se o usuário selecionou uma opção errada */}
              {isWrongSelection && isAnswerVisible && (
                <span className="rounded bg-red-200 p-[2px]">
                  <X className="size-4 text-red-800" />
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
