import knex from "../../config/knex"
import firstRow from "../../utils/firstrow"
import {
  UrlSchema,
  type IUrl,
} from "./model"

export async function createUrl(
  url: string,
  userId: number,
  id?: string
): Promise<IUrl> {
  return UrlSchema.parse(
    await knex("urls")
      .insert({
        url,
        user_id: userId,
        id: id as any,
      }, "*")
      .then(firstRow))
}

export async function findById(
  id: string
): Promise<IUrl | undefined> {
  const row = await knex("urls")
    .where({ id })
    .first()

  if (!row) return undefined
  return UrlSchema.parse(row)
}

export async function updateUrl(
  id: string,
  url: string
): Promise<IUrl | undefined> {
  const row = await knex("urls")
    .where({ id })
    .update({ url }, "*")
    .then(firstRow)

  if (!row) return undefined
  return UrlSchema.parse(row)
}

export async function deleteUrl(
  id: string
): Promise<number> {
  return knex("urls")
    .where({ id })
    .delete()
}

const UrlSchemaArray = UrlSchema.array()

export async function getUrls(
  user_id: number,
  limit: number = 10,
  offset: number = 0
): Promise<IUrl[]> {
  return UrlSchemaArray.parse(
    await knex("urls")
      .where({ user_id })
      .limit(limit || 10)
      .offset(offset || 0)
  )
}
