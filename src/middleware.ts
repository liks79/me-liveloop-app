import type { MiddlewareHandler } from "astro";

/**
 * Redirect legacy /en and /en/* URLs to / and /* (no longer using language prefix).
 * Fixes 404 when something (e.g. cached link or sessionStorage backUrl) requests /en/.
 */
export const onRequest: MiddlewareHandler = (context, next) => {
  const pathname = context.url.pathname;

  if (pathname === "/en" || pathname === "/en/") {
    return Response.redirect(new URL("/", context.url.origin), 301);
  }

  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(4) || "";
    return Response.redirect(new URL("/" + rest, context.url.origin), 301);
  }

  return next();
};
