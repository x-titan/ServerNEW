import httpAssert from "http-assert"
import type z from "zod"

export default function schemaAssert(
  schema: z.ZodType,
  data: z.infer<typeof schema>,
  status: number): asserts data {
  const error = schema.safeParse(data).error
  if (error)
    httpAssert.fail(status, error.message)
}