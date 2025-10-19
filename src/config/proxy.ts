import { createSafeObject } from "../utils"
import type { IProxyConfig } from "./types/proxyConfig"

const proxyConfig: IProxyConfig = createSafeObject({
  auth: {
    path: "/auth",
    options: {
      target: "https://localhost:4001",
      changeOrigin: true,
      logs: true,
      rewrite: path => path.replace(/^\/auth/, "")
    }
  },

  urls: {
    path: "/urls",
    options: {
      target: "https://localhost:4001",
      changeOrigin: true,
      logs: true,
      rewrite: path => path.replace(/^\/urls/, "")
    }
  }
})

export default proxyConfig
