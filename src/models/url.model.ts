import knex from "../config/knex"
import type Url from "../types/url"

export async function createUrl(url: string, userId: number, id?: string): Promise<{ id: string; url: string } | undefined> {
  return knex("urls")
    .insert({
      url,
      user_id: userId,
      id: id as any,
    }, ["id", "url"])
    .then((rows) => rows[0])
}

export async function findById(id: string): Promise<Url | undefined> {
  return knex("urls")
    .where({ id })
    .first()
}

export async function updateUrl(id: string, url: string): Promise<Url | undefined> {
  return knex("urls")
    .where({ id })
    .update({ url }, "*")
    .first()
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
): Promise<Url[]> {
  return knex("urls")
    .where({ user_id })
    .limit(limit || 10)
    .offset(offset || 0)
}
