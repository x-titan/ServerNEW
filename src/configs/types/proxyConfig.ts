import type proxy from "koa-proxies"

export interface IProxyConfig {
  [gateway: string]: {
    path: string
    options: proxy.IKoaProxiesOptions
  }
}
