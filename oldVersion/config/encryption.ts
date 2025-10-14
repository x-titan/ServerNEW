import bcrypt from "bcryptjs"

const SALT_ROUNDS = parseInt(process.env.PASSWORD_SALT_ROUNDS || "10")

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  return bcrypt.hash(password, salt)
}

export async function comparePassword(
  password: string,
  hash: string
) {
  return bcrypt.compare(password, hash)
}
