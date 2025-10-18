import { IUser } from "../modules/users/model"
import { IUrl } from "../modules/urls/model"
import { IVisit } from "../modules/visits/model"

declare module "knex/types/tables" {
  interface Tables {
    users: IUser
    urls: IUrl
    visits: IVisit
  }
}
