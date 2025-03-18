"use client";

import { signOut } from "next-auth/react";

export default function Page() {
  signOut({
    callbackUrl: "/sign-in",
  });

  return null;
}
