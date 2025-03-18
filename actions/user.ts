"use server";
import { getExistedUser, signUp } from "@/services/user-service";
import { z } from "zod";

export const actionSignUp = async (data: Record<string, string>) => {
  const parsedData = z
    .object({
      login: z.string(),
      password: z.string().min(6, "Min length is 6"),
      repeat: z.string().min(6),
    })
    .safeParse(data);

  const errors = parsedData.error;
  if (errors) {
    const convertedErrors = errors.issues.map((error) => [
      error.path[0].toString(),
      error.message,
    ]);

    return { error: convertedErrors };
  }

  const existedUser = await getExistedUser(parsedData.data.login);

  if (existedUser) {
    return {
      error: [["login", "This name is already existed"]],
    };
  }

  await signUp(parsedData.data.login, parsedData.data.password);

  return { success: true };
};
