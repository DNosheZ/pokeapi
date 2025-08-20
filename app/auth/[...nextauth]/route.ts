import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: String(user.id),
          email: user.email,
          firstname: user.firstname,
        };
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // gracias a la augmentación, estos campos existen
        session.user.id = token.id as string | number | undefined;
        session.user.firstname = token.firstname as string | undefined;
        session.user.email = token.email as string | undefined;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id?: string | number }).id;
        token.firstname = (user as { firstname?: string }).firstname;
        token.email = user.email;
      }
      return token;
    },
  },
});

export const runtime = "nodejs";
export { handler as GET, handler as POST };
