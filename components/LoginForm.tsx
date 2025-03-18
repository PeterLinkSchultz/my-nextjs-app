"use client";

import { signIn } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";

import { useForm } from "react-hook-form";

type Inputs = {
  login: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (response?.ok) {
      redirect("/journal", RedirectType.replace);
    } else {
      setError("root", {
        type: "custom",
        message: "Wrong login or password",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-[250px]"
    >
      <input
        type="text"
        className="input input-primary"
        placeholder="login"
        {...register("login")}
      />
      <input
        type="password"
        className="input input-primary"
        placeholder="password"
        {...register("password")}
      />
      {errors.root && (
        <div className="alert alert-error alert-soft">
          {errors.root?.message}
        </div>
      )}
      <button
        className={`btn btn-active ${isSubmitting && "btn-disabled"}`}
        type="submit"
      >
        {isSubmitting ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Sign In"
        )}
      </button>
      <button
        className="btn btn-link"
        type="button"
        onClick={() => redirect("/sign-up")}
      >
        Sign Up
      </button>
    </form>
  );
}
