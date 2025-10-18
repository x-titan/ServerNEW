import type * as Koa from "koa"

export interface IState extends Koa.DefaultState {
  user?: {
    id: number
  }
}

export interface IAuthState extends IState {
  user: {
    id: number
  }
}
