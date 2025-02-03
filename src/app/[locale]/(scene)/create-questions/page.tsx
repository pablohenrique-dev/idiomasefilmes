import { CreateQuestionForm } from "./create-question-form";

export default function CreateQuestionsPage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <>
      <CreateQuestionForm locale={params.locale} />
    </>
  );
}
