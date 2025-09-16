import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (users) => {
    users
      .increments("id")
      .primary()
    users
      .string("username")
      .unique()
      .notNullable()
    users
      .text("password")
      .notNullable()
    users
      .timestamps(true, true)
  }).createTable("urls", (urls) => {
    urls
      .string("id")
      .defaultTo(knex.raw("substring(md5(random()::text) from 0 for 7)"))
      .primary()
    urls
      .text("url")
      .notNullable()
    urls
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable()
    urls
      .timestamps(true, true)
  }).createTable("visits", (visits) => {
    visits
      .increments("id")
      .primary()
    visits
      .string("url_id")
      .references("id")
      .inTable("urls")
      .onDelete("CASCADE")
      .notNullable()
    visits
      .string("ip")
      .notNullable()
    visits
      .timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await (
    knex
      .schema
      .dropTable("visits")
      .dropTable("urls")
      .dropTable("users")
  )
}
