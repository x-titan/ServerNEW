import { IJSONResponse } from "../../core/types/response"
import { IUrl } from "./model"

export interface IUrlRequest {
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

export interface IUrlResponse extends IJSONResponse {
  data: IUrl
}

export interface IUrlListResponse extends IJSONResponse {
  data: IUrl[]
}