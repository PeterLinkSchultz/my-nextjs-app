"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC } from "react";

type Props = {
  isAuth: boolean;
};

const HeaderButtons: FC<Props> = ({ isAuth }) => {
  return isAuth ? (
    <button className="button" onClick={() => signOut()}>
      Logout
    </button>
  ) : (
    <div className="flex gap-2">
      <button className="button" onClick={() => redirect("/sign-in")}>
        Sign in
      </button>
      <button className="button" onClick={() => redirect("/sign-up")}>
        Sign up
      </button>
    </div>
  );
};

export default HeaderButtons;
