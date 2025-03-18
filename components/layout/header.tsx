import { getServerSession } from "next-auth/next";
import HeaderButtons from "./header-buttons";

export default function Header() {
  const session = getServerSession();

  return (
    <header className="w-full border-b-2 py-2 min-h-[60px] flex">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <div>Logo</div>
        <div>Menu</div>
        <HeaderButtons isAuth={!!session} />
      </div>
    </header>
  );
}
