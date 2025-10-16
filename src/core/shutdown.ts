import { Server } from "http"
import { closeDatabase } from "../config/knex"

export default function setupGracefulShutdown(server: Server) {
  async function shutdown(signal: string) {
    console.log("\n" + signal + " received, shutting down gracefully...")

    server.close(async () => {
      console.log("HTTPS server closed")
      try {
        await closeDatabase()
        process.exit(0)
      } catch (error) {
        console.error("Error during shutdown:", error)
        process.exit(1)
      }
    })

    setTimeout(() => {
      console.error("Force shutdown after timeout")
      process.exit(1)
    }, 10000)
  }

  process.on("SIGTERM", shutdown.bind(null, "SIGTERM"))
  process.on("SIGINT", shutdown.bind(null, "SIGINT"))
  process.on("unhandledRejection", (reason, promise) =>
    console.error("Unhandled Rejection at:", promise, "reason:", reason)
  )
  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error)
    shutdown("uncaughtException")
  })
}
