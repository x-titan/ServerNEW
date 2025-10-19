import z from "zod"

export const VisitSchema = z.object({
  id: z.number(),
  url_id: z.string(),
  ip: z.string(),
  created_at: z.date(),
  updated_at: z.date()
})

export type IVisit = z.infer<typeof VisitSchema>
