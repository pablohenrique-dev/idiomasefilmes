import { getQuestionsBySceneIdData } from "@/data-access/get-questions-by-scene-slug";
import { EditQuestionsForm } from "./edit-questions-form";
import { SessionProvider } from "next-auth/react";
import { getTranslations } from "next-intl/server";

export default async function EditQuestionPage({
  params,
}: {
  params: { sceneId: string; locale: string };
}) {
  const { data } = await getQuestionsBySceneIdData(params.sceneId);
  const t = await getTranslations("Form");

  if (!data) return <h1>No question</h1>;
  return (
    <section className="container">
      <h1 className="my-4 text-center text-xl">{t("questions.title")}</h1>
      <SessionProvider>
        <EditQuestionsForm locale={params.locale} questions={data} />
      </SessionProvider>
    </section>
  );
}
