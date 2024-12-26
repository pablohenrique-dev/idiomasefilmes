import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export { auth as authMiddleware } from "@/auth";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(pt|en|es)/:path*"],
};
