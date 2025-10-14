import httpAssert from "http-assert"
import * as UrlModel from "./model"
import { validateUrl } from "../../utils/validate"

export async function createShortURL(
  url: string,
  user_id: number,
  url_id?: string
) {
  httpAssert(url, 400, "URL is required")

  if (url_id)
    httpAssert(
      !(await UrlModel.findById(url_id)),
      409, "The ID that you provided already exists in our database"
    )

  validateUrl(url)

  return UrlModel.createUrl(url, user_id, url_id)
}

export async function resolveURL(id: string) {
  var url = await UrlModel.findById(id)
  httpAssert(url, 404, "URL not found")

  return url.url
}

export async function updateURL(
  url_id: string,
  url: string,
  user_id: number
) {
  httpAssert(url, 400, "URL is required")

  const existingUrl = await UrlModel.findById(url_id)

  httpAssert(
    existingUrl,
    404, "URL not found"
  )
  httpAssert(
    existingUrl.user_id === user_id,
    401, "You don't have permissions to update this URL"
  )

  return UrlModel.updateUrl(url_id, url)
}

export async function deleteURL(url_id: string, user_id: number) {
  const existingUrl = await UrlModel.findById(url_id)

  httpAssert(
    existingUrl,
    404, "URL not found"
  )
  httpAssert(
    existingUrl.user_id === user_id,
    401, "You don't have permissions to delete this URL"
  )

  httpAssert(
    await UrlModel.deleteUrl(url_id) > 0,
    404, "URL not found or already deleted"
  )

  return { message: "URL deleted successfully" }
}

export async function getURLS(user_id: number, limit: number = 10, offset: number = 0) {

  return UrlModel.getUrls(user_id, limit, offset)

  // Enhanced version with visit counts
  // return knex("urls")
  //   .where({ user_id })
  //   .leftJoin("visits", "urls.id", "visits.url_id")
  //   .select(
  //     "urls.id",
  //     "urls.url",
  //     "urls.created_at",
  //     knex.raw("COUNT(visits.id) AS visit_count")
  //   )
  //   .limit(limit)
  //   .offset(offset)
  //   .groupBy("urls.id")
  //   .orderBy("urls.created_at", "desc")
}
