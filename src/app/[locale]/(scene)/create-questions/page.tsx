import { useTranslations } from "next-intl";
import { CreateQuestionForm } from "./create-question-form";

export default function CreateQuestionsPage({
  params,
}: {
  params: { locale: string };
}) {
  const t = useTranslations("ScenePage");

  return (
    <>
      {/* <h1 className="mb-3 mt-6 text-center text-2xl font-medium">
        {t("create.title")}
      </h1> */}
      <CreateQuestionForm locale={params.locale} />
    </>
  );
}
