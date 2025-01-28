import { useTranslations } from "next-intl";
import { CreateSceneForm } from "./create-scene-form";

export default function CreateScenePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("ScenePage");

  return (
    <>
      {/* <h1 className="mb-3 mt-6 text-center text-2xl font-medium">
        {t("create.title")}
      </h1> */}
      <CreateSceneForm locale={locale} />
    </>
  );
}
