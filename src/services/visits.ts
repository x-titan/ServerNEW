import knex from "../config/knex"
import httpAssert from "http-assert"

export async function registerVisit(url_id: string, ip: string) {
  return knex("visits")
    .insert({
      url_id,
      ip,
    })
}

export async function getLastVisit(
  url_id: string,
  limit: number = 10,
  offset: number = 0
) {
  return knex("visits")
    .join(
      "urls",
      "urls.id",
      "visits.url_id"
    )
    .select(
      "visits.id",
      "visits.url_id",
      "visits.ip",
      "visits.created_at"
    )
    .where({ url_id })
    .limit(limit)
    .offset(offset)
    .orderBy("visits.created_at", "desc")
}

export async function getVisitByURL(
  url_id: string,
  user_id: number,
  limit = 10,
  offset = 0
) {
  const url = await knex("urls")
    .where({ id: url_id })
    .select(["user_id"])
    .first()

  httpAssert(url, 404, "URL not found")
  httpAssert(url.user_id === user_id, 401,
    "You don't have permissions to view visits for this URL")

  return knex("visits")
    .where({ url_id })
    .limit(limit)
    .offset(offset)
    .orderBy("created_at", "desc")
}
