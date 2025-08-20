// lib/auth.ts
import "server-only";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/libs/db";

type CredUser = { id?: string | number; name?: string | null; email?: string | null };

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials.password) return null;

        const userFound = await db.user.findUnique({
          where: { username: credentials.username },
        });
        if (!userFound) return null;

        const ok = await bcrypt.compare(credentials.password, userFound.password);
        if (!ok) return null;

        return {
          id: String(userFound.id),
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as CredUser;
        token.userId = u.id;
        token.username = u.name ?? token.username;
        token.email = u.email ?? token.email;
      }

      if (token.email) {
        const dbUser = await db.user.findUnique({
          where: { email: token.email },
          select: { id: true, username: true, firstname: true, createdAt: true },
        });
        if (dbUser) {
          token.userId = dbUser.id;
          token.username = dbUser.username;
          token.firstname = dbUser.firstname;
          token.createdAt = dbUser.createdAt.toISOString();
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string | number | undefined;
        session.user.username = token.username as string | undefined;
        session.user.firstname = token.firstname as string | undefined;
        session.user.createdAt = token.createdAt as string | undefined;
      }
      return session;
    },
  },
  pages: { signIn: "/auth/login" },
};
