import client from "@/db/client";
import jwt from "jsonwebtoken";

export const authUser = async (userId: string) => {
  const token = jwt.sign({ userId }, process.env.NEXTAUTH_SECRET!, {
    expiresIn: "1d",
  });

  return await client.userSession.create({
    data: {
      userId,
      authToken: token,
      expires: "1",
    },
  });
};

export const getUserFromToken = async (authToken: string) => {
  const decoded = jwt.verify(authToken, process.env.NEXTAUTH_SECRET!) as {
    userId: string;
  };

  return decoded.userId;
};

export const checkAuth = async (authToken: string) => {
  try {
    return await getUserFromToken(authToken);
  } catch {
    await client.userSession.delete({
      where: {
        authToken,
      },
    });

    return false;
  }
};
