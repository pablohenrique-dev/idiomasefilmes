import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import { Stepper } from "./stepper";

export default async function CreateSceneLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  const session = await auth();

  if (!session) redirect("/api/auth/signin");
  return (
    <SessionProvider>
      <section className="container">
        <Stepper locale={params.locale} />
        {children}
      </section>
    </SessionProvider>
  );
}
