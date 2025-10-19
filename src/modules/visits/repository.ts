import knex from "../../config/knex"
import firstRow from "../../utils/firstrow"
import {
  VisitSchema,
  type IVisit,
} from "./model"

export async function registerVisit(
  url_id: string,
  ip: string
): Promise<IVisit> {
  return VisitSchema.parse(
    await knex("visits")
      .insert({
        url_id,
        ip,
      }, "*")
      .then(firstRow))
}

const VisitSchemaArray = VisitSchema.array()
export async function getVisitListByURL(
  url_id: string,
  limit = 10,
  offset = 0
): Promise<IVisit[]> {
  return VisitSchemaArray.parse(
    await knex("visits")
      .where({ url_id })
      .limit(limit)
      .offset(offset)
      .orderBy("created_at", "desc")
  )
}
