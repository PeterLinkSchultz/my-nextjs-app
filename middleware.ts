import { getToken } from "next-auth/jwt";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";
// import { authConfig } from "./auth.config";

const unauthed = ["/sign-up", "/sign-in"];

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const { data } = (await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })) as {
      data: {
        expires: number;
        authToken: string;
      };
    };

    if (data.authToken && new Date().getTime() > data.expires * 1000) {
      return NextResponse.redirect(new URL("/sign-out", req.url));
    }
    if (data.authToken && unauthed.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/journal", req.url));
    }
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/sign-in",
      error: "/error",
      signOut: "/sign-out",
    },
    callbacks: {
      authorized(params) {
        return Boolean(params.token);
      },
    },
  }
);
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|sign|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
