import type { Middleware } from "../../core/types"
import fs from "fs"
import path from "path"

export const index: Middleware = async (ctx) => {
  await ctx.render("share", { title: "Share" })
}

export const upload: Middleware = async (ctx) => {
  if (ctx.request.files) {
    console.log(ctx.request.files)
    const uploadedFile = ctx.request.files.file as any
    const newPath = path.join("./uploads", uploadedFile.originalFilename)
    fs.renameSync(uploadedFile.filepath, newPath)
  }
  ctx.body = "ok"
}

export const download: Middleware = async (ctx) => {

}
