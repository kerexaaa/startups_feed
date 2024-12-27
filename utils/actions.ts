"use server";

import { auth } from "@/auth";
import { parseAction } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

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
