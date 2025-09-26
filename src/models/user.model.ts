import knex from "../config/knex"
import type User from "../types/user"

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

export async function deleteUser(id: number): Promise<number> {
  return knex("users")
    .where({ id })
    .delete()
}
