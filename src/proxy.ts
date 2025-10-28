import KoaProxies from "koa-proxies"
import createServer from "./core/server"
import proxyConfig from "./configs/proxy"
import { IProxyConfig } from "./configs/types/proxyConfig"
import type Koa from "koa"

function setupProxy(app: Koa, config: IProxyConfig = proxyConfig) {

}


export default setupProxy