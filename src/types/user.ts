export default interface User {
  id: number
  username: string
  password: string
  created_at: Date
  updated_at: Date
}

export interface PublicUser
  extends Omit<User, "password" | "created_at" | "updated_at"> { }

export interface AuthUser
  extends Omit<User, "id" | "created_at" | "updated_at"> { }
