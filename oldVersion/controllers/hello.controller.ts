import type { RouterContext, Middleware } from "@koa/router"

export const world: Middleware = async (ctx: RouterContext) => {
  await ctx.render("helloworld", { title: "Hello world!" })
}
