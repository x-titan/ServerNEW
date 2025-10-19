import knex from "../../config/knex"
import firstRow from "../../utils/firstrow"
import {
  PublicUserSchema,
  UserSchema,
  type IPublicUser,
  type IUser,
} from "./model"

export async function findById(
  id: number
): Promise<IUser | undefined> {
  const row = await knex("users")
    .where({ id })
    .first()

  if (!row) return undefined
  return UserSchema.parse(row)
}

export async function findByUsername(
  username: string
): Promise<IUser | undefined> {
  const row = await knex("users")
    .whereRaw(`LOWER(username) = LOWER(?)`, [username])
    .first()

  if (!row) return undefined
  return UserSchema.parse(row)
}

export async function createUser(
  username: string,
  hashedPassword: string
): Promise<IPublicUser> {
  return PublicUserSchema.parse(
    await knex("users")
      .insert({
        username,
        password: hashedPassword,
      }, ["username", "id"])
      .then(firstRow))
}

export async function deleteUser(
  id: number
): Promise<number> {
  return knex("users")
    .where({ id })
    .delete()
}
