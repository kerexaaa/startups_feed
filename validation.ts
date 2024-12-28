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
        return /^(https?|ftp):\/\/.*\.(jpeg|jpg|png)$/i.test(url);
      } catch (error) {
        return false;
      }
    }),
  pitch: z.string().min(10),
});

export const editSchema = z.object({
  name: z.string().min(3).max(30).optional().or(z.literal("")),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        return /^(https?|ftp):\/\/.*\.(jpeg|jpg|png)$/i.test(url);
      } catch (error) {
        return false;
      }
    })
    .optional()
    .or(z.literal("")),
  username: z.string().min(3).max(30).optional().or(z.literal("")),
  bio: z.string().max(500).optional().or(z.literal("")),
});
