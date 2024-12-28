"use server";

import { auth } from "@/auth";
import { parseAction } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID } from "@/sanity/lib/queries";

export const updateUser = async (state: any, formData: FormData) => {
  const session = await auth();
  if (!session) {
    return parseAction({
      error:
        "i don't even know how you performed this action, but please log in first",
      status: "error",
    });
  }

  const { name, link, username, bio } = Object.fromEntries(formData.entries());
  const id = session.id;
  const user = await client.fetch(AUTHOR_BY_ID, { id });

  if (user) {
    try {
      const { bName, bLink, bUsername, Bbio } = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_ID, { id });
      const updatedUser = {
        name: name || bName,
        image: link || bLink,
        username: username || bUsername,
        bio: bio || Bbio,
      };
      const res = writeClient.patch(id).set(updatedUser).commit();
      return parseAction({ ...res, error: "", status: "success" });
    } catch (error) {
      console.log(error);
      return parseAction({ error: JSON.stringify(error), status: "error" });
    }
  }
};

export const createStartup = async (
  state: any,
  formData: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session) {
    return parseAction({
      error: "arghh, sign in first to perform this action",
      status: "error",
    });
  }

  const { title, description, link, category } = Object.fromEntries(
    Array.from(formData).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const res = await writeClient.create({ _type: "startup", ...startup });
    return parseAction({ ...res, error: "", status: "success" });
  } catch (error) {
    console.log(error);

    return parseAction({ error: JSON.stringify(error), status: "error" });
  }
};
