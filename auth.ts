import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_SESSION } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          console.log("Credentials:", credentials);

          const existingUser = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_SESSION, {
              email: credentials.email,
            });

          if (!existingUser) {
            throw new Error("User with this email is not registered");
          }

          if (existingUser.password == null) {
            throw new Error("This user is registered already with a provider!");
          }

          console.log("Existing user:", existingUser);

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (isPasswordCorrect) {
            console.log("Returning existing user...");
            return existingUser;
          } else {
            throw new Error("Password is incorrect");
          }
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (!token.id && user?.id) {
        session.id = token.id as string;
      } else if (token.id) {
        session.id = token.id as string;
      }

      return session;
    },
    async signIn({ profile, account, user }) {
      if (account?.provider == "credentials") {
        return true;
      }

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_SESSION, {
          email: profile?.email,
        });

      if (existingUser && existingUser.password) {
        console.log(`User with email ${profile?.email} already exists.`);
        return `/?error=UserAlreadyExists`;
      }

      console.log(existingUser);

      const username = profile?.email
        ?.replace(" ", "")
        .toLowerCase()
        .split("@")[0];
      console.log("Name", user.name);
      console.log(username);
      console.log("Email", user.email);
      console.log("Image", user.image);

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          name: user.name,
          username: username,
          email: user.email,
          image: user.image,
          bio: "",
          password: null,
        });
        console.log("Created user with profile", profile);
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_SESSION, {
            email: user.email,
          });

        if (existingUser) {
          token.id = existingUser._id;
        }
      }

      return token;
    },
  },
});
