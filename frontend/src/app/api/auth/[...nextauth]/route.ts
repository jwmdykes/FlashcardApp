import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

if (process.env.GITHUB_ID == null || process.env.GITHUB_SECRET == null) {
  throw new TypeError(
    "Environment variables GITHUB_ID and GITHUB_SECRET must be set.",
  );
}

if (process.env.NEXTAUTH_SECRET == null) {
  throw new TypeError("Environment variable NEXTAUTH_SECRET must be set.");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTHSECRET,
  providers: [
    GithubProvider({
      name: "github",
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: 'jwt'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
