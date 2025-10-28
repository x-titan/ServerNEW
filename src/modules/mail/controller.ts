import type { IAuthMiddleware } from "../../core/types"
import { safeObject } from "../../utils"
import schemaAssert from "../../utils/schemaAssert"
import { IMail, mailScheme } from "./model"
import * as mailService from "./service"


export const sendMail: IAuthMiddleware = async (ctx, next) => {
  const body = safeObject(ctx.request.body) as IMail
  schemaAssert(mailScheme, body, 400)
  const user_id = ctx.state.user.id

  await mailService.sendMail(body.from, body.to, body.subject, body.message)
}

export const deleteMail: IAuthMiddleware = async (ctx, next) => {
  const body = safeObject(ctx.request.body) as { id: number }

  await mailService.deleteMail(body.id)
}
