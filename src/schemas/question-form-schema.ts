import { z } from "zod";

export const questionFormSchema = z.object({
  questions: z.array(
    z.object({
      statement: z.string().min(1, "O enunciado é obrigatório"),
      options: z
        .array(z.string().min(1, "A alternativa é obrigatória"))
        .length(5, "É necessário 5 alternativas"),
      correctAnswer: z
        .number()
        .min(0)
        .max(4, "Selecione a alternativa correta"),
    }),
  ),
});

export type QuestionFormType = z.infer<typeof questionFormSchema>;
