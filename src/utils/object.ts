import { isObject } from "./types"

export function safeObject<T = {}>(obj?: T): T {
  return Object.assign(Object.create(null), obj)
}

export function resolveOptions<T extends object>(
  defaults: T,
  overrides?: Partial<T> | unknown
): T {
  if (!isObject(overrides))
    return { ...defaults }

  return {
    ...defaults,
    ...overrides
  }
}
