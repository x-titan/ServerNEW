import assert from "assert"
import {
  isDefined,
  isFunction,
  isNumber,
} from "@x-titan/type-is"

import {
  resolveOptions,
  noop,
} from "../utils"

import type { Server as HttpServer } from "http"
import type { Server as HttpsServer } from "https"
import type { Http2Server } from "http2"

type AnyServer = Pick<
  HttpServer | HttpsServer | Http2Server, "close"
>

interface GracefulShutdownOptions {
  onClose?: () => (Promise<void> | void)
  timeout?: number // ms
}

async function shutdown(
  server: AnyServer,
  onClose: () => (Promise<void> | void),
  timeout: number,
  signal: string
) {
  console.log(`Received ${signal}, starting graceful shutdown...`)

  const closeServer = new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) return reject(error)
      console.log("HTTP(S) server closed")
      resolve()
    })
  })

  const timer = setTimeout(() => {
    console.error("Force shutdown after timeout")
    process.exit(1)
  }, timeout)

  try {
    await closeServer
    clearTimeout(timer)
    await onClose()

    console.log("Graceful shutdown complete")
    process.exit(0)
  } catch (error) {
    console.error("Error during shutdown:", error)
    process.exit(1)
  }
}

const shutdownOptions: GracefulShutdownOptions = {
  timeout: 10000,
  onClose: noop
}

export default function setupGracefulShutdown(
  server: AnyServer,
  options?: GracefulShutdownOptions
) {
  assert(
    isDefined(server) && isFunction(server.close),
    "server must be a valid Server instance"
  )

  const {
    timeout,
    onClose,
  } = resolveOptions(shutdownOptions, options)

  assert(
    isNumber(timeout),
    "timeout must be a number"
  )
  assert(
    isFunction(onClose),
    "onClose must be a function"
  )

  const handleSignal = shutdown.bind(
    null,
    server,
    onClose,
    timeout
  )

  process.once("SIGTERM", handleSignal.bind(null, "SIGTERM"))
  process.once("SIGINT", handleSignal.bind(null, "SIGINT"))

  process.on(
    "unhandledRejection",
    (reason, promise) =>
      console.error(
        "Unhandled Rejection at:", promise,
        "reason:", reason
      )
  )

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error)
    handleSignal("uncaughtException")
  })
}
