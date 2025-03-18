import { PropsWithChildren } from "react";
import Header from "@/components/layout/header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div className="flex h-full relative">
        <aside className="absolute w-[200px] h-full border-r">mood</aside>
        <div className="ml-[200px] h-[calc(100vh-60px)] w-[calc(100vw-200px)]">
          {children}
        </div>
      </div>
    </>
  );
}
