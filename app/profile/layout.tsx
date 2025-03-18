import { PropsWithChildren } from "react";
import Header from "@/components/layout/header";

export default function Layout({
  children,
}: // m,
PropsWithChildren) {
  return (
    <>
      <Header />
      <div className="flex flex-1 justify-center items-center">{children}</div>
    </>
  );
}
