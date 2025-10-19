import z from "zod"

export const JSONResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
})

export const ErrorResponseSchema = JSONResponseSchema.extend({
  success: z.literal(false),
  message: z.string(),
  error: z.string().optional(),
  stack: z.string().optional(),
  path: z.string().optional(),
  timestamp: z.string().optional(),
})

export type IJSONResponse = z.infer<typeof JSONResponseSchema>

export type IErrorResponse = z.infer<typeof ErrorResponseSchema>

