import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
