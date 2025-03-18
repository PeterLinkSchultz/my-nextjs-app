import bcrypt from "bcrypt";
import client from "@/db/client";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

const saltRounds = 10;

export const signIn = async (login: string, password: string) => {
  const user = await client.user.findUnique({
    where: {
      login,
    },
  });

  if (!user) {
    return null;
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (passwordsMatch) {
    return user;
  }

  return null;
};

export const signUp = async (login: string, password: string) => {
  return await client.user.create({
    data: { login, password: await bcrypt.hash(password, saltRounds) },
  });
};

export const getUser = async () => {
  const session = await getServerSession(authConfig);
  const userSession = session?.user as unknown as {
    id: string;
  };

  return userSession.id;
};

export const getExistedUser = async (login: string) => {
  const user = await client.user.findUnique({
    where: {
      login,
    },
  });

  return user;
};
