import NextAuth, { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id?: number | string;
      username?: string;
      firstname?: string;
      createdAt?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId?: number | string;
    username?: string;
    firstname?: string;
    createdAt?: string;
  }
}
