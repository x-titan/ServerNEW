import knex from "../config/knex"
import type Visit from "../types/visit"
import firstRow from "../utils/firstrow"

export async function registerVisit(
  url_id: string,
  ip: string
): Promise<Visit | undefined> {
  return knex("visits")
    .insert({
      url_id,
      ip,
    }, "*")
    .then(firstRow)
}

export async function getVisitByURL(
  url_id: string,
  limit = 10,
  offset = 0
): Promise<Visit[]> {
  return knex("visits")
    .where({ url_id })
    .limit(limit)
    .offset(offset)
    .orderBy("created_at", "desc")
}
