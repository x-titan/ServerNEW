import httpAssert from "http-assert"
import knex from "../config/knex"

export async function createShortURL(
  body: { url: string, id?: string },
  user_id: number
) {
  httpAssert(body.url, 400, "URL is required")

  if (body.id) {
    var current_record = await knex("urls")
      .where({ id: body.id })
      .first()

    httpAssert(!current_record, 409, "The ID that you provided already exists in our database")
  }
  httpAssert(/^https?:\/\/.+$/.test(body.url), 400, "URL must start with http:// or https://")

  return (await knex("urls")
    .insert({
      url: body.url,
      id: body.id as any,
      user_id,
    }, "*"))[0]
}

export async function resolveURL(id: string) {
  var url = await knex("urls")
    .where({ id })
    .select(["url"])
    .first()

  httpAssert(url, 404, "URL not found")

  return url.url
}

export async function updateURL(
  id: string,
  body: { url: string },
  user_id: number
) {
  httpAssert(body.url, 400, "URL is required")

  var url = await knex("urls")
    .where({ id })
    .select(["user_id"])
    .first()

  httpAssert(url, 404, "URL not found")
  httpAssert(url.user_id === user_id, 401,
    "You don't have permissions to update this URL")

  return knex("urls")
    .where({ id })
    .update({ url: body.url }, "*")
    .first()
}

export async function deleteURL(id: string, user_id: number) {
  var url = await knex("urls")
    .where({ id })
    .select(["user_id"])
    .first()

  httpAssert(url, 404, "URL is not found")
  httpAssert(url.user_id === user_id, 401,
    "You don't have permissions to update this URL")

  const deletedCount = await knex("urls")
    .where({ id })
    .delete()

  return deletedCount > 0
}

export async function getURLS(user_id: number, limit: number = 10, offset: number = 0) {
  return knex("urls")
    .where({ user_id })
    .leftJoin("visits", "urls.id", "visits.url_id")
    .select(
      "urls.id",
      "urls.url",
      "urls.created_at",
      knex.raw("COUNT(visits.id) AS visit_count")
    )
    .limit(limit)
    .offset(offset)
    .groupBy("urls.id")
    .orderBy("urls.created_at", "desc")
}
