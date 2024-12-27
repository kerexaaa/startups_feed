import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const authorSchema = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "string",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "username",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "string",
    }),
    defineField({
      name: "bio",
      type: "text",
    }),
    defineField({
      name: "password",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
