import z from "zod"
import {
  JSONResponseSchema,
  type IJSONResponse,
} from "../../core/types"

export const UrlSchema = z.object({
  id: z.string(),
  url: z.httpUrl(),
  user_id: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const UrlRequestSchema = z.object({
  /**
   * Id for shorted url.
   * Example: `abc123` -> `https://example.com`
   */
  url_id: z.string(),
  /**
   * Providing url.
   * Example: `https://example.com`
   */
  url: z.string(),
})

export const UrlResponse = JSONResponseSchema.extend({
  data: UrlSchema
})

export type IUrl = z.infer<typeof UrlSchema>

// REQUEST

export type IUrlRequest = z.infer<typeof UrlRequestSchema>

// RESPONSE

export interface IUrlResponse extends IJSONResponse {
  data: IUrl
}

export interface IUrlListResponse extends IJSONResponse {
  data: IUrl[]
}

