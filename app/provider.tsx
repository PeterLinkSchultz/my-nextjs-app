"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function Provider({
  children,
  session,
}: PropsWithChildren & { session: Session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
