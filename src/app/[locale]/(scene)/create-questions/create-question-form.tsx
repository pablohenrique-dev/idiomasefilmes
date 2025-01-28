"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useQuestionForm } from "@/hooks/use-question-form";
import { cn } from "@/lib/utils";
import { useBoundStore } from "@/lib/zustand/use-bound-store";
import { Controller } from "react-hook-form";

interface CreateQuestionFormProps {
  locale: string;
}

// TODO: Criar um form apenas para atualizar uma única questão

export function CreateQuestionForm({ locale }: CreateQuestionFormProps) {
  const { questions } = useBoundStore((state) => state);

  const defaultValues = {
    questions: questions?.length
      ? questions.map((question) => ({
          ...question,
          options: question.options || ["", "", "", "", ""],
        }))
      : [
          {
            statement: "",
            options: ["", "", "", "", ""],
            correctAnswer: 0,
          },
        ],
  };

  const {
    // t,
    // t2,
    // toast,
    control,
    append,
    errors,
    fields,
    onSubmit,
    register,
    handleSubmit,
  } = useQuestionForm({ locale, defaultValues });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 flex min-h-screen flex-col gap-8"
    >
      {fields.map((field, questionIndex) => (
        <div key={field.id} className="">
          <label htmlFor={`questions.${questionIndex}.statement`}>
            Adicione o enunciado da Questão {questionIndex + 1}
          </label>
          <Input
            id={`questions.${questionIndex}.statement`}
            {...register(`questions.${questionIndex}.statement`)}
            className="mb-2 block w-full border p-2"
          />
          {errors.questions?.[questionIndex]?.statement && (
            <span className="text-red-500">
              {errors.questions[questionIndex].statement?.message}
            </span>
          )}

          <div className="flex flex-col gap-2">
            <p className="mt-4">Adicione as alternativas</p>
            {Array.from({ length: 5 }).map((_, optionIndex) => (
              <div key={optionIndex} className="flex items-start gap-2">
                <p>{optionIndex + 1 + ")"}</p>
                <div className="w-full">
                  <Input
                    type="text"
                    {...register(
                      `questions.${questionIndex}.options.${optionIndex}`,
                    )}
                    placeholder={`Alternativa ${optionIndex + 1}`}
                    className="w-full"
                  />
                  {errors.questions?.[questionIndex]?.options?.[
                    optionIndex
                  ] && (
                    <span className="text-red-500">
                      {
                        errors.questions[questionIndex].options[optionIndex]
                          ?.message
                      }
                    </span>
                  )}
                </div>
                <Controller
                  name={`questions.${questionIndex}.correctAnswer`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        id={`question-${questionIndex}-option-${optionIndex}`}
                        name={`questions.${questionIndex}.correctAnswer`}
                        value={optionIndex}
                        checked={field.value === optionIndex}
                        onChange={() => field.onChange(optionIndex)}
                        className="sr-only"
                      />
                      <label
                        className={cn(
                          "cursor-pointer text-nowrap rounded-lg px-4 py-[6px] transition-all hover:opacity-100",
                          field.value === optionIndex
                            ? "bg-black text-white"
                            : "bg-[#F5F5F5] text-black opacity-60",
                        )}
                        htmlFor={`question-${questionIndex}-option-${optionIndex}`}
                      >
                        Questão correta
                      </label>
                    </>
                  )}
                />
              </div>
            ))}
          </div>
          {errors.questions?.[questionIndex]?.options && (
            <span className="text-red-500">
              {errors.questions[questionIndex]?.options.message}
            </span>
          )}

          {fields.length > 1 && (
            <Separator className="mt-9 h-[1px] w-full bg-gray-400" />
          )}
        </div>
      ))}

      <div>
        <Button
          type="button"
          onClick={() =>
            append({
              statement: "",
              options: ["", "", "", "", ""],
              correctAnswer: 0,
            })
          }
          variant="secondary"
        >
          Adicionar Nova Questão
        </Button>

        <Button variant="default" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}
