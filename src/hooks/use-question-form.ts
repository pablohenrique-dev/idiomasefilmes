import { Question as IQuestion } from "@/@types/question";
import { Scene } from "@/@types/scene";
import { useToast } from "@/hooks/use-toast";
import { resetAllSlices, useBoundStore } from "@/lib/zustand/use-bound-store";
import {
  questionFormSchema,
  QuestionFormType,
} from "@/schemas/question-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Question } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

interface QuestionDefaultValues {
  statement: string;
  options: string[];
  correctAnswer: number;
}

interface UseQuestionFormParams {
  locale: string;
  defaultValues: { questions: QuestionDefaultValues[] };
  editQuestionsAction?: (
    data: Question[],
    locale: string,
  ) => Promise<[string | null, string | null]>;
  createSceneAndQuestionsAction?: (
    data: Scene,
    questions: Omit<IQuestion, "sceneId" | "id">[],
    locale: string,
  ) => Promise<[string | null, string | null]>;
  sceneData?: Scene;
  sceneId?: string;
  sceneSlug: string | null;
}

export function useQuestionForm({
  locale,
  defaultValues,
  createSceneAndQuestionsAction,
  editQuestionsAction,
  sceneSlug,
}: UseQuestionFormParams) {
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  function handleDeleteQuestion(questionIndex: number) {
    const confirmDelete = confirm(
      t("questions.messages.confirmDelete") + (questionIndex + 1),
    );

    if (!confirmDelete) return;

    remove(questionIndex);
  }

  async function onSubmitCreateSceneAndQuestions(data: QuestionFormType) {
    const questions = data.questions.map((question) => ({
      authorId: session!.user.id,
      ...question,
    }));

    if (!createSceneAndQuestionsAction) return;

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

  async function onSubmitEditQuestions(data: Question[]) {
    if (!editQuestionsAction) return;

    const [successMessage, errorMessage] = await editQuestionsAction(
      data,
      locale,
    );

    if (successMessage) {
      resetAllSlices();
      toast({ title: successMessage });
      router.push(`/${locale}/${sceneSlug}?active-tab=questions`);
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
    handleSubmit,
    handleDeleteQuestion,
    onSubmitEditQuestions,
    onSubmitCreateSceneAndQuestions,
  };
}
