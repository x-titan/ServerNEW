import type { IMiddleware } from "../../core/types"
import fs from "fs"
import path from "path"

export const index: IMiddleware = async (ctx) => {
  await ctx.render("share", { title: "Share" })
}

export const upload: IMiddleware = async (ctx) => {
  if (ctx.request.files) {
    console.log(ctx.request.files)
    const uploadedFile = ctx.request.files.file as any
    const newPath = path.join("./uploads", uploadedFile.originalFilename)
    fs.renameSync(uploadedFile.filepath, newPath)
  }
  ctx.body = {
    success: false
  }
}

export const download: IMiddleware = async (ctx) => {

}
