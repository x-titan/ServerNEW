export interface UrlBody {
  /**
   * Id for shorted url.
   * Example: `abc123` -> `https://example.com`
   */
  url_id?: string
  /**
   * Providing url.
   * Example: `https://example.com`
   */
  url?: string
}

export interface UrlModel {
  id: string
  url: string
  user_id: number
  created_at: Date
  updated_at: Date
}
