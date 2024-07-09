import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const {email, password} = credentials as { email: string, password: string };

        try {
          const results = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            })
          })

          const response = await results.json();

          if (response.error === null && response.status === 200) {
            return response.data;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, account, profile, user}: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },
    async session({session, token}: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }

      if ("name" in token) {
        session.user.name = token.name;
      }

      if ("role" in token) {
        session.user.role = token.role;
      }

      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };