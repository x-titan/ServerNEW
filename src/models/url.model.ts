import knex from "../config/knex"
import type Url from "../types/url"

export default class UrlModel {
  static async createUrl(url: string, userId: number, id?: string): Promise<{ id: string; url: string } | undefined> {
    return knex("urls")
      .insert({
        url,
        user_id: userId,
        id: id as any,
      }, ["id", "url"])
      .then((rows) => rows[0])
  }

  static async findById(id: string): Promise<Url | undefined> {
    return knex("urls")
      .where({ id })
      .first()
  }

  static async updateUrl(id: string, url: string): Promise<Url | undefined> {
    return knex("urls")
      .where({ id })
      .update({ url }, "*")
      .first()
  }

  static async deleteUrl(id: string): Promise<number> {
    return knex("urls")
      .where({ id })
      .delete()
  }

  static async getUrls(
    user_id: number,
    limit: number = 10,
    offset: number = 0
  ): Promise<Url[]> {
    return knex("urls")
      .where({ user_id })
      .limit(limit || 10)
      .offset(offset || 0)
  }
}
