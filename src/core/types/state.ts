import type * as Koa from "koa"

export interface State extends Koa.DefaultState {
  user?: {
    id: number
  }
}

export interface AuthState extends State {
  user: {
    id: number
  }
}
