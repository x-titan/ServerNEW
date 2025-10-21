import type {
  IErrorListener,
} from "../../types"

const loggerError: IErrorListener = (error, ctx) => {
  if (!error || error.message === "Not Found") return

  console.error("[APP ERROR]", {
    issuer: error.name,
    message: error.message,
    stack: error.stack,
    method: ctx?.method,
    url: ctx?.url,
    timestamp: new Date().toISOString()
  })
}

export default loggerError
