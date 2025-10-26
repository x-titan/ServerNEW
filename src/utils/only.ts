export default function only<
  T extends object,
  K extends keyof T
>(
  obj: T,
  keys: readonly K[] | string
): Pick<T, K> {
  obj = obj || {}
  if (typeof keys === "string")
    keys = keys.split(/ +/) as any as readonly K[]

  return keys.reduce(function (ret, key) {
    if (null == obj[key])
      return ret
    ret[key] = obj[key]
    return ret
  }, {} as Pick<T, K>);
}
