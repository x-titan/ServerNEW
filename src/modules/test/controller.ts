import z from "zod"
import type {
  IRouterMiddleware,
} from "../../core/types"

const someschema = z.object({
  data1: z.number()
})

export const getTestPage: IRouterMiddleware = async (ctx) => {
  try {
    const res = someschema.safeParse({
      data2: "value2"
    })

    console.log(res)
  } catch (error) {
    console.log("[TEST error]", error)
    throw error
  }

  ctx.body = {
    success: true,
    message: "Test GET"
  }
}

export const postTest: IRouterMiddleware = async (ctx) => {
  ctx.body = {
    success: true,
    message: "Test POST"
  }
}
