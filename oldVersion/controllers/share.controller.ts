import type { Middleware, RouterContext } from "@koa/router"
import type { Files } from "formidable"
import fs from "fs"
import path from "path"

interface FileRequestContext extends RouterContext {
  request: RouterContext["request"] & { files?: Files };
}

export const index: Middleware = async (ctx: RouterContext) => {
  await ctx.render("share", { title: "Share" })
}

export const upload: Middleware = async (ctx: FileRequestContext) => {
  if (ctx.request.files) {
    console.log(ctx.request.files)
    const uploadedFile = ctx.request.files.file as any
    const newPath = path.join("./uploads", uploadedFile.originalFilename)
    fs.renameSync(uploadedFile.filepath, newPath)
  }
  ctx.body = "ok"
}

export const download: Middleware = async (ctx: RouterContext) => {

}
