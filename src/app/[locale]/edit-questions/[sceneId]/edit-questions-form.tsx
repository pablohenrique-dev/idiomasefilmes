"use client";

import { editQuestionsAction } from "@/actions/edit-questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useQuestionForm } from "@/hooks/use-question-form";
import { cn } from "@/lib/utils";
import { QuestionFormType } from "@/schemas/question-form-schema";
import { Question } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { Controller } from "react-hook-form";

interface EditQuestionsFormProps {
  questions: Question[];
  locale: string;
}

export function EditQuestionsForm({
  questions,
  locale,
}: EditQuestionsFormProps) {
  const searchParams = useSearchParams();

  const sceneSlug = searchParams.get("scene-slug");

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
    t,
    control,
    append,
    errors,
    fields,
    onSubmitEditQuestions,
    register,
    handleSubmit,
    handleDeleteQuestion,
  } = useQuestionForm({
    locale,
    defaultValues,
    editQuestionsAction,
    sceneSlug,
  });

  function handleEditQuestionsSubmit(formData: QuestionFormType) {
    const editedQuestions = formData.questions.map((question, index) => ({
      ...questions[index], // Mantém os dados originais da pergunta
      ...question, // Sobrescreve apenas os dados alterados do formulário
    }));

    onSubmitEditQuestions(editedQuestions);
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditQuestionsSubmit)}
      className="mb-8 flex min-h-screen flex-col gap-8"
    >
      {fields.map((field, questionIndex) => (
        <div key={field.id} className="">
          <label
            htmlFor={`questions.${questionIndex}.statement`}
            className="font-semibold"
          >
            {t("questions.statement.label")} {questionIndex + 1}
          </label>
          <Input
            id={`questions.${questionIndex}.statement`}
            {...register(`questions.${questionIndex}.statement`)}
            className="mb-2 block w-full border p-2 text-neutral-600"
            placeholder={t("questions.statement.placeholder")}
          />
          {errors.questions?.[questionIndex]?.statement && (
            <span className="text-red-500">
              {errors.questions[questionIndex].statement?.message}
            </span>
          )}

          <div className="flex flex-col gap-2">
            <p className="mt-4 font-semibold">{t("questions.options.label")}</p>
            {Array.from({ length: 5 }).map((_, optionIndex) => (
              <div key={optionIndex} className="flex items-start gap-2">
                <p>{optionIndex + 1 + ")"}</p>
                <div className="w-full">
                  <Input
                    type="text"
                    {...register(
                      `questions.${questionIndex}.options.${optionIndex}`,
                    )}
                    placeholder={`${t("questions.options.placeholder")} ${optionIndex + 1}`}
                    className="w-full text-neutral-600"
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
                        {t("questions.button.correctAlternative")}
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

          <Button
            variant="destructive"
            className="mt-4"
            type="button"
            onClick={() => handleDeleteQuestion(questionIndex)}
          >
            {t("questions.button.delete")}
          </Button>

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
          {t("questions.button.newQuestion")}
        </Button>

        <Button variant="default" type="submit">
          {t("questions.button.update")}
        </Button>
      </div>
    </form>
  );
}
