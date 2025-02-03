import { Question } from "@/@types/question";
import { createSceneAndQuestionsAction } from "@/actions/create-scene-and-questions";
import { useToast } from "@/hooks/use-toast";
import { resetAllSlices, useBoundStore } from "@/lib/zustand/use-bound-store";
import {
  questionFormSchema,
  QuestionFormType,
} from "@/schemas/question-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

interface QuestionDefaultValues {
  statement: string;
  options: string[];
  correctAnswer: number;
}

interface useQuestionFormParams {
  locale: string;
  defaultValues: { questions: QuestionDefaultValues[] };
  action?: (data: Question, locale: string) => Promise<(string | null)[]>;
}

export function useQuestionForm({
  locale,
  defaultValues,
}: useQuestionFormParams) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const router = useRouter();

  const t = useTranslations("Form");
  const schema = questionFormSchema(t);
  const { scene } = useBoundStore((state) => state);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { fields, append } = useFieldArray({
    control,
    name: "questions",
  });

  async function onSubmit(data: QuestionFormType) {
    const questions = data.questions.map((question) => ({
      authorId: session!.user.id,
      ...question,
    }));

    const [successMessage, errorMessage] = await createSceneAndQuestionsAction(
      scene,
      questions,
      locale,
    );

    if (successMessage) {
      resetAllSlices();
      toast({ title: successMessage });
      router.push("/");
    } else if (errorMessage) {
      toast({ title: errorMessage, variant: "destructive" });
    }
  }

  return {
    t,
    append,
    fields,
    errors,
    control,
    register,
    onSubmit,
    handleSubmit,
  };
}
