import { type SchemaTypeDefinition } from "sanity";
import { authorSchema } from "./author";
import { startupSchema } from "./startup";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorSchema, startupSchema],
};
