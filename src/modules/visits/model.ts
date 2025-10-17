import knex from "../../config/knex"
import firstRow from "../../utils/firstrow"
import type { VisitModel } from "./types"

export async function registerVisit(
  url_id: string,
  ip: string
): Promise<VisitModel> {
  return knex("visits")
    .insert({
      url_id,
      ip,
    }, "*")
    .then(firstRow) as Promise<VisitModel>
}

export async function getVisitListByURL(
  url_id: string,
  limit = 10,
  offset = 0
): Promise<VisitModel[]> {
  return knex("visits")
    .where({ url_id })
    .limit(limit)
    .offset(offset)
    .orderBy("created_at", "desc")
}
