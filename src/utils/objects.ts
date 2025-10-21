import { isObject } from "./types"

export function safeObject<T = {}>(obj?: T): T {
  return Object.assign(Object.create(null), obj)
}

export function mergeOptions<T extends object>(
  value: unknown,
  defaultValue: T
): T {
  if (!isObject(value))
    return { ...defaultValue }

  return {
    ...defaultValue,
    ...value as Partial<T>
  }
}
