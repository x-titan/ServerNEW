import knex from "../../config/knex"
import type User from "../../types/user"
import type { PublicUser } from "../../types/user"
import firstRow from "../../utils/firstrow"

export async function findById(id: number): Promise<User | undefined> {
  return knex("users")
    .where({ id })
    .first()
}

export async function findByUsername(username: string): Promise<User | undefined> {
  return knex("users")
    .whereRaw(`LOWER(username) = LOWER(?)`, [username])
    .first()
}

export async function createUser(
  username: string,
  hashedPassword: string
): Promise<PublicUser | undefined> {
  return knex("users")
    .insert({
      username,
      password: hashedPassword,
    }, ["username", "id"])
    .then(firstRow)
}

export async function deleteUser(id: number): Promise<number> {
  return knex("users")
    .where({ id })
    .delete()
}
