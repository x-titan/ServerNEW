export interface IUser {
  id: number
  username: string
  password: string
  created_at: Date
  updated_at: Date
}

/**
 * `IPublicUser = { username, id }`
 */
export interface IPublicUser
  extends Omit<IUser, "password" | "created_at" | "updated_at"> { }
