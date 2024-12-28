import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "GET" });
        const contentType = res.headers.get("content-type");

        return contentType?.startsWith("image/");
      } catch (error) {
        return false;
      }
    }),
  pitch: z.string().min(10),
});

export const editSchema = z.object({
  name: z.string().min(3).max(30).optional().or(z.literal("")),
  link: z.string().url().optional().or(z.literal("")),
  username: z.string().min(3).max(30).optional().or(z.literal("")),
  bio: z.string().max(500).optional().or(z.literal("")),
});

const isImage = async (url: string) => {
  try {
    const res = await fetch(url, { method: "GET" });
    const contentType = res.headers.get("content-type");

    return contentType?.startsWith("image/");
  } catch (error) {
    return false;
  }
};

export const validateEdit = async (data: any) => {
  const res = await editSchema.parseAsync(data);

  if (res.link && !(await isImage(res.link))) {
    throw new Error("Provided link is not a valid image url");
  }

  return res;
};
