import knex from "../../config/knex"
import firstRow from "../../utils/firstrow"
import type { UrlModel } from "./types"

export async function createUrl(
  url: string,
  userId: number,
  id?: string
): Promise<UrlModel> {
  return knex("urls")
    .insert({
      url,
      user_id: userId,
      id: id as any,
    }, "*")
    .then(firstRow) as Promise<UrlModel>
}

export async function findById(
  id: string
): Promise<UrlModel | undefined> {
  return knex("urls")
    .where({ id })
    .first()
}

export async function updateUrl(
  id: string,
  url: string
): Promise<UrlModel | undefined> {
  return knex("urls")
    .where({ id })
    .update({ url }, "*")
    .then(firstRow)
}

export async function deleteUrl(id: string): Promise<number> {
  return knex("urls")
    .where({ id })
    .delete()
}

export async function getUrls(
  user_id: number,
  limit: number = 10,
  offset: number = 0
): Promise<UrlModel[]> {
  return knex("urls")
    .where({ user_id })
    .limit(limit || 10)
    .offset(offset || 0)
}
