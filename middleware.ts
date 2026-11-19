import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEV_AUTH_COOKIE } from "@/lib/auth/devGate";

const STUDY_PATHS = [
  "/dashboard",
  "/focus",
  "/schedule",
  "/mindmaps",
  "/flashcards",
  "/quizzes",
  "/profile",
  "/settings",
];

function hasDevAuth(request: NextRequest): boolean {
  return request.cookies.get(DEV_AUTH_COOKIE)?.value === "1";
}

function isStudyPath(pathname: string): boolean {
  return STUDY_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function isAuthPath(pathname: string): boolean {
  return pathname === "/auth/login" || pathname === "/auth/signup";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = hasDevAuth(request);

  if (isStudyPath(pathname) && !authed) {
    const login = new URL("/auth/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if (isAuthPath(pathname) && authed) {
    const next = request.nextUrl.searchParams.get("next");
    const dest =
      next && next.startsWith("/") && !next.startsWith("//")
        ? next
        : "/dashboard";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/focus/:path*",
    "/schedule/:path*",
    "/mindmaps/:path*",
    "/flashcards/:path*",
    "/quizzes/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/auth/login",
    "/auth/signup",
  ],
};