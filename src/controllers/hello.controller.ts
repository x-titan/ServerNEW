import type { RouterContext } from "@koa/router"

export async function world(ctx: RouterContext) {
  await ctx.render("helloworld", { title: "Hello world!" })
}
