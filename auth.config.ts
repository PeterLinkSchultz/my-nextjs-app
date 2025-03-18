import Credentials from "next-auth/providers/credentials";
import { signIn } from "./services/user-service";
import { z } from "zod";
import { AuthOptions, User } from "next-auth";
import { authUser } from "@/services/auth-service";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authConfig: AuthOptions = {
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  providers: [
    Credentials({
      credentials: {
        login: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const parsedCredentials = z
          .object({ login: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { login, password } = parsedCredentials.data;

          const user = await signIn(login, password);

          if (user) {
            const { authToken } = await authUser(user?.id as string);
            const decoded = jwt.decode(authToken) as { exp: number };

            return {
              user,
              authToken,
              expires: decoded.exp,
            };
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 5,
  },
  callbacks: {
    async jwt({ token, user }) {
      const { data } = token as {
        data: { authToken: string; expires: number };
      };

      if (user) {
        return {
          ...token,
          data: user,
        };
      }
      // check token in db

      if (new Date().getTime() < data.expires * 1000) {
        return token;
      }

      return { ...token, error: "RefreshTokenExpired" } as JWT;
    },

    async session({ session, token }) {
      const t = token as { data: { user: User } };
      session.user = t.data.user;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 60 * 60,
    secret: process.env.NEXTAUTH_SECRET,
  },
  debug: true,
};
