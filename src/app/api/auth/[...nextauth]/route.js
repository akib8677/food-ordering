import { User } from "@/app/models/user";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOption = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      httpOptions: {
        timeout: 10000,
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      id: "credentials",

      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;
        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const comparePass = user && bcrypt.hashSync(password, user.password);
        if (comparePass) {
          return user;
        }
        return null;
      },
    }),
  ],
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST };
