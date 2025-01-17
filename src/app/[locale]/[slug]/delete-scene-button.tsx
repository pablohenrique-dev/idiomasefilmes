"use client";

import { deleteSceneAction } from "@/actions/delete-scene";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface DeleteSceneButtonProps {
  slug: string;
  locale: string;
}

export function DeleteSceneButton({ slug, locale }: DeleteSceneButtonProps) {
  const t = useTranslations("Components");
  const { toast } = useToast();

  const router = useRouter();

  async function handleClick() {
    const isConfirmed = confirm(t("confirmMessage.delete"));

    if (isConfirmed) {
      const [successMessage, errorMessage] = await deleteSceneAction(
        slug,
        locale,
      );

      if (successMessage) {
        toast({ title: successMessage });
        router.push("/");
      } else if (errorMessage) {
        toast({ title: errorMessage, variant: "destructive" });
      }
    }
  }

  return (
    <Button onClick={handleClick} variant="destructive">
      {t("Button.exclude")}
    </Button>
  );
}
