import { useTranslations } from "next-intl";
import { z } from "zod";

export const questionFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    questions: z.array(
      z.object({
        statement: z.string().min(1, t("questions.options.lengthErrorMessage")),
        options: z
          .array(z.string().min(1, "A alternativa é obrigatória"))
          .length(5, "É necessário 5 alternativas"),
        correctAnswer: z.number(),
      }),
    ),
  });

export type QuestionFormType = z.infer<ReturnType<typeof questionFormSchema>>;
