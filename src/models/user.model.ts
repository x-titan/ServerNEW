import knex from "../config/knex"
import type User from "../types/user"

export default class UserModel {
  static async findById(id: number): Promise<User | undefined> {
    return knex("users")
      .where({ id })
      .first()
  }

  static async findByUsername(username: string): Promise<User | undefined> {
    return knex("users")
      .whereRaw(`LOWER(username) = LOWER(?)`, [username])
      .first()
  }

  static async createUser(
    username: string,
    hashedPassword: string
  ): Promise<{
    id: number;
    username: string
  } | undefined> {
    return knex("users")
      .insert({
        username,
        password: hashedPassword,
      }, ["username", "id"])
      .then((rows) => rows[0])
  }

  static async deleteUser(id: number): Promise<number> {
    return knex("users")
      .where({ id })
      .delete()
  }
}
