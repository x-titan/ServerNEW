import z from "zod"

export function someTestZodParse(schema: z.ZodObject, value: unknown) {
  return schema.parse(value)
}