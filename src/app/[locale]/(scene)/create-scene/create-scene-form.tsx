"use client";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSceneForm } from "@/hooks/use-scene-form";
import { useBoundStore } from "@/lib/zustand/use-bound-store";
import {
  accentOptions,
  genreOptions,
  levelOptions,
} from "@/utils/constants/scene";

interface CreateSceneFormProps {
  locale: string;
}

export function CreateSceneForm({ locale }: CreateSceneFormProps) {
  const { scene } = useBoundStore((state) => state);

  const { form, t, onSubmit } = useSceneForm({
    locale,
    defaultValues: {
      accent: scene.accent ?? undefined,
      genre: scene.genre ?? undefined,
      level: scene.level ?? "",
      scene_url: scene.scene_url ?? "",
      script: scene.script ?? "",
      source: scene.source ?? "",
      thumb_url: scene.thumb_url ?? "",
      title: scene.title ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-8 grid grid-cols-1 gap-5 space-y-8 sm:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="!mt-3 sm:!mt-4">
              <FormLabel>{t("scene.title.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("scene.title.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="!mt-3 sm:!mt-4">
              <FormLabel>{t("scene.origin.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("scene.origin.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumb_url"
          render={({ field }) => (
            <FormItem className="!mt-3 sm:!mt-4">
              <FormLabel>{t("scene.thumb.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("scene.thumb.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scene_url"
          render={({ field }) => (
            <FormItem className="!mt-3 sm:!mt-4">
              <FormLabel>{t("scene.scene.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("scene.scene.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <fieldset className="col-span-full !mt-0 grid w-full grid-cols-1 gap-5 sm:grid-cols-3 sm:flex-row">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="!mt-3 sm:!mt-4">
                <FormLabel>{t("scene.level.label")}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="text-">
                      <SelectValue placeholder={t("scene.level.placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map((option) => (
                        <SelectItem
                          className="[aria-selected='true'"
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="!mt-3 flex-1 sm:!mt-4">
                <FormLabel>{t("scene.genre.label")}</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={genreOptions[locale as keyof typeof accentOptions]}
                    placeholder={t("scene.genre.placeholder")}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accent"
            render={({ field }) => (
              <FormItem className="!mt-3 flex-1 sm:!mt-4">
                <FormLabel>{t("scene.accent.label")}</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={
                      accentOptions[locale as keyof typeof accentOptions]
                    }
                    placeholder={t("scene.accent.placeholder")}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <FormField
          control={form.control}
          name="script"
          render={({ field }) => (
            <FormItem className="col-span-full !mt-3 sm:!mt-4">
              <FormLabel>{t("scene.script.label")}</FormLabel>
              <FormControl>
                <Editor
                  content={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="col-span-1 !mt-4 w-fit" type="submit">
          {t("scene.button.next")}
        </Button>
      </form>
    </Form>
  );
}
