import z from "zod";

export const mailScheme = z.object({
  from: z.string(),
  to: z.string(),
  subject: z.string(),
  message: z.string(),
})

export type IMail = z.infer<typeof mailScheme>
