import { isWritable } from "../../../utils"
import type { IContext } from "../../types"

export const throwNotFound = (ctx: IContext) => {
  if (isWritable(ctx))
    throw ctx.throw(
      404,
      `Route ${ctx.method} ${ctx.path} not found`
    );
};
