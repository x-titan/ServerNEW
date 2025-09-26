import knex from "../config/knex"
import type Visit from "../types/visit"

export async function registerVisit(
  url_id: string,
  ip: string
): Promise<Visit | undefined> {
  return knex("visits")
    .insert({
      url_id,
      ip,
    }, "*")
    .then((rows) => rows[0])
}

export async function getLastVisit(
  url_id: string,
  limit: number = 10,
  offset: number = 0
): Promise<Visit[]> {
  return knex("visits")
    .where({ url_id })
    .limit(limit)
    .offset(offset)
    .orderBy("created_at", "desc")
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
