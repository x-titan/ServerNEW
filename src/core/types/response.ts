import z from "zod"

export const JSONResponseSchema = z.object({
  success: z.boolean(),
  status: z.number().optional(),
  message: z.string().optional(),
  data: z.any().optional(),
})

export const ErrorResponseSchema = JSONResponseSchema.extend({
  success: z.literal(false),
  message: z.string().default("Internal server Error"),

  error: z.object({
    status: z.number().default(500),

    message: z.string().optional(),
    path: z.string().optional(),
    stack: z.string().optional(),
    timestamp: z.string().optional(),
    name: z.string().optional(),
  }).optional()
})

export type IJSONResponse = z.infer<typeof JSONResponseSchema>

export type IErrorResponse = z.infer<typeof ErrorResponseSchema>
