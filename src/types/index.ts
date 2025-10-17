import { UserModel } from "../modules/users/types"
import { UrlModel } from "../modules/urls/types"
import { VisitModel } from "../modules/visits/types"

declare module "knex/types/tables" {
  interface Tables {
    users: UserModel
    urls: UrlModel
    visits: VisitModel
  }
}
