import assert from "assert"
import knex from "../config/knex"

export async function createShortURL(
  body: { url: string, id?: string },
  user_id: number
) {
  assert(body.url, "URL is required")
  if (body.id) {
    var current_record = await knex("urls").where({ id: body.id }).first()
    assert(!current_record, "The ID that you provided already exists in our database")
  }

  return await (
    knex("url")
      .insert(
        { url: body.url, id: body.id, user_id },
        "*"
      ).first()
  )
}

export async function resolveURL(id: string) {
  const url = await knex("urls").where({ id }).select(["url"]).first()
  assert(url, "The id is not valid")
  return url.url
}

export async function updateURL(
  id: string,
  body: { url: string },
  user_id: number
) {
  assert(body.url,"IRL is required")
  // PASS
}
