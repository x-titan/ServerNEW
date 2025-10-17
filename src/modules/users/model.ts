import knex from "../../config/knex"
import firstRow from "../../utils/firstrow"
import type { PublicUserModel, UserModel } from "./types"

export async function findById(id: number): Promise<UserModel | undefined> {
  return knex("users")
    .where({ id })
    .first()
}

export async function findByUsername(username: string): Promise<UserModel | undefined> {
  return knex("users")
    .whereRaw(`LOWER(username) = LOWER(?)`, [username])
    .first()
}

export async function createUser(
  username: string,
  hashedPassword: string
): Promise<PublicUserModel> {
  return knex("users")
    .insert({
      username,
      password: hashedPassword,
    }, ["username", "id"])
    .then(firstRow) as Promise<PublicUserModel>
}
export async function deleteUser(id: number): Promise<number> {
  return knex("users")
    .where({ id })
    .delete()
}
