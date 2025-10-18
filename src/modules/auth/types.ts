import { IJSONResponse } from "../../core/types/response"
import { IPublicUser, IUser } from "../users/model"

export interface ILoginAuthResponse extends IJSONResponse {
  token: string
}

export interface IPublicAuthResponse extends IJSONResponse {
  data: IPublicUser
}

/**
 * `IAuthUser = { username, password }`
 */

export interface IAuthUserRequest
  extends Omit<IUser, "id" | "created_at" | "updated_at"> {
}
