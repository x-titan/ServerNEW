import httpAssert from "http-assert"
import { isString } from "../../utils/types"
import { URL } from "url"

const urlIdRegex = /^[a-zA-Z0-9_-]+$/

export function validateURL(url?: string): asserts url {
  httpAssert(url, 400, "URL is required")
  httpAssert(isString(url), 400, "URL must be a string")

  try {
    httpAssert(
      ["http:", "https:"].includes(new URL(url).protocol),
      400, "URL must use HTTP or HTTPS protocol")
  } catch (error) {
    httpAssert.fail(400, "Invalid URL format")
  }

  httpAssert(
    url.length <= 2048,
    400, "URL is too long (max 2048 characters)")
}

export function validateUrlId(urlId?: string): asserts urlId {
  if (!urlId) return

  httpAssert(
    isString(urlId),
    400, "URL ID must be a string")
  httpAssert(
    urlId.length >= 3 && urlId.length <= 50,
    400, "URL ID must be a between 3 and 50 characters"
  )
  httpAssert(
    urlIdRegex.test(urlId),
    400, "URL ID can only contain letters, numbers, underscores and hyphens"
  )
}
