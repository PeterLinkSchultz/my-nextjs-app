import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 justify-center items-center">{children}</div>
  );
}
