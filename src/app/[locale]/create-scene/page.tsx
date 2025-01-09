import { useTranslations } from "next-intl";
import { CreateSceneForm } from "./create-scene-form";
import { SessionProvider } from "next-auth/react";

export default function CreateScenePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("CreateScenePage");
  return (
    <SessionProvider>
      <section className="container">
        <h1 className="mb-3 mt-6 text-center text-2xl font-medium">
          {t("title")}
        </h1>
        <CreateSceneForm locale={locale} />
      </section>
    </SessionProvider>
  );
}
