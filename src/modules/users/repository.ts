import knex from "../../config/knex"
import firstRow from "../../utils/firstrow"
import type { IPublicUser, IUser } from "./model"

export async function findById(
  id: number
): Promise<IUser | undefined> {
  return knex("users")
    .where({ id })
    .first()
}

export async function findByUsername(
  username: string
): Promise<IUser | undefined> {
  return knex("users")
    .whereRaw(`LOWER(username) = LOWER(?)`, [username])
    .first()
}

export async function createUser(
  username: string,
  hashedPassword: string
): Promise<IPublicUser> {
  return knex("users")
    .insert({
      username,
      password: hashedPassword,
    }, ["username", "id"])
    .then(firstRow) as Promise<IPublicUser>
}

export async function deleteUser(
  id: number
): Promise<number> {
  return knex("users")
    .where({ id })
    .delete()
}
