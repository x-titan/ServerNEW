export interface UserModel {
  id: number
  username: string
  password: string
  created_at: Date
  updated_at: Date
}

export interface PublicUserModel
  extends Omit<UserModel, "password" | "created_at" | "updated_at"> { }

export interface AuthUserModel
  extends Omit<UserModel, "id" | "created_at" | "updated_at"> { }
