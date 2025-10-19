import type { IUser } from "../modules/users/model"
import type { IUrl } from "../modules/urls/model"
import type { IVisit } from "../modules/visits/model"

declare module "knex/types/tables" {
  interface Tables {
    users: IUser
    urls: IUrl
    visits: IVisit
  }
}
