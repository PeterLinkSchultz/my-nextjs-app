"use client";

import { actionSignUp } from "@/actions/user";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

type Inputs = {
  login: string;
  password: string;
  repeat: string;
};

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    if (data.password !== data.repeat) {
      setError("repeat", {
        type: "custom",
        message: "Passwords aren't equal",
      });
    }
    const response = await actionSignUp(data);

    if (response.error) {
      for (const error of response.error) {
        setError(error[0] as "login" | "password" | "repeat", {
          type: "custom",
          message: error[1],
        });
      }
      return;
    }
  };

  console.log("errors", errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="grid gap-4 my-4 w-[250px]">
        <input
          type="text"
          className="input input-primary"
          placeholder="login"
          required
          {...register("login")}
        />
        <input
          type="password"
          className="input input-primary"
          placeholder="password"
          required
          {...register("password")}
        />
        <input
          type="password"
          className="input input-primary"
          placeholder="password"
          required
          {...register("repeat")}
        />
        {errors.repeat && (
          <div className="alert alert-error alert-soft">
            {errors.repeat?.message}
          </div>
        )}
        {errors.password && (
          <div className="alert alert-error alert-soft">
            {errors.password?.message}
          </div>
        )}
        {errors.login && (
          <div className="alert alert-error alert-soft">
            {errors.login?.message}
          </div>
        )}
        <button
          className={`btn btn-active ${isSubmitting && "btn-disabled"}`}
          type="submit"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Sign Up"
          )}
        </button>
        <button
          className="btn btn-link"
          type="button"
          onClick={() => redirect("/sign-in")}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
