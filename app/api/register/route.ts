import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_SESSION } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();



  const userExists = await client.fetch(AUTHOR_BY_SESSION, {
    email: email,
  });

  if (userExists) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  let username = email.replace(" ", "").toLowerCase();

  username = email.split("@")[0];

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    if (!userExists) {
      console.log("Creating new user...");

      await writeClient.create({
        _type: "author",
        name: email,
        username: username,
        email: email,
        image: "/default.jpg",
        password: hashedPassword,
        bio: "",
      });
    }

    console.log("New user created!");
    return new NextResponse("User registered successfully!", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
