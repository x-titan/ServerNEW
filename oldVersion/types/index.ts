import User from "./user"
import Url from "./url"
import Visit from "./visit"

declare module "knex/types/tables" {
  interface Tables {
    users: User
    urls: Url
    visits: Visit
  }
}
