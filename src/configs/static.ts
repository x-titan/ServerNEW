import path from "path"
import type { Options } from "koa-static"

const staticOptions = {
  root: path.join(__dirname, "../../public"),
  options: {} as Options,
}

export default staticOptions