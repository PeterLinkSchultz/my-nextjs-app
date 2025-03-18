import { getExistedUser, signUp } from "@/services/user-service";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: Request) => {
  const data = await req.json();
  const parsedData = z
    .object({
      login: z.string(),
      password: z.string().min(6),
      repeat: z.string().min(6),
    })
    .safeParse(data);

  if (parsedData.error) {
    return NextResponse.json({ error: parsedData.error }, { status: 500 });
  }

  const existedUser = await getExistedUser(parsedData.data.login);

  if (existedUser) {
    return NextResponse.json(
      {
        error: {
          login: "This name is already existed",
        },
      },
      { status: 500 }
    );
  }

  await signUp(parsedData.data.login, parsedData.data.password);

  return NextResponse.json({ data });
};
