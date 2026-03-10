import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ["/dashboard", "/admin"];
const adminPaths = ["/admin"];

// Simple in-memory rate limiter (per IP, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_API_MAX = 60; // 60 API requests per minute per IP
const RATE_LIMIT_AUTH_MAX = 10; // 10 auth requests per minute per IP

function getRateLimitKey(req: NextRequest, prefix: string): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "unknown";
  return `${prefix}:${ip}`;
}

function checkRateLimit(key: string, max: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= max) return false;

  entry.count++;
  return true;
}

function isProtectedPath(pathname: string): boolean {
  return protectedPaths.some((path) => {
    const withoutLocale = pathname.replace(/^\/(en|ar|es|fr)/, "");
    return withoutLocale === path || withoutLocale.startsWith(path + "/");
  });
}

function isAdminPath(pathname: string): boolean {
  return adminPaths.some((path) => {
    const withoutLocale = pathname.replace(/^\/(en|ar|es|fr)/, "");
    return withoutLocale === path || withoutLocale.startsWith(path + "/");
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply rate limiting to API routes
  if (pathname.startsWith("/api/")) {
    const isAuthApi = pathname.startsWith("/api/auth/");
    const key = getRateLimitKey(request, isAuthApi ? "auth" : "api");
    const max = isAuthApi ? RATE_LIMIT_AUTH_MAX : RATE_LIMIT_API_MAX;

    if (!checkRateLimit(key, max)) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please slow down." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }

    return NextResponse.next();
  }

  // Skip Next.js internals and static files
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  // Auth check for protected routes
  if (isProtectedPath(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const locale = pathname.split("/")[1] || "en";
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Admin-only check
    if (isAdminPath(pathname) && token.role !== "ADMIN") {
      const locale = pathname.split("/")[1] || "en";
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|images|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|.*\\.webp).*)",
  ],
};
