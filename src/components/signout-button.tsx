"use client";

import { signoutAction } from "@/actions/signout";
import { Button } from "./ui/button";

export function SignOut() {
  return (
    <Button
      type="submit"
      variant="secondary"
      className="w-full"
      onClick={() => signoutAction()}
    >
      Sair
    </Button>
  );
}
