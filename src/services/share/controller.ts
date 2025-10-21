import fs from "fs"
import path from "path"
import type {
  IRouterMiddleware,
} from "../../core/types"

export const index: IRouterMiddleware = async (ctx) => {
  await ctx.render("share", { title: "Share" })
}

export const upload: IRouterMiddleware = async (ctx) => {
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

export const download: IRouterMiddleware = async (ctx) => {

}
