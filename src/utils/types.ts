export function isNull(value: unknown) {
  return value === null
}

export function isUndefined(value: unknown) {
  return value === void 0
}

export function isDefined(value: unknown): value is any {
  return value != null
}

export function isEmpty(value: unknown) {
  return value == null
}

export function isNumber(value: unknown): value is number {
  return (typeof value === "number") && isFinite(value)
}

export function isString(value: unknown) {
  return typeof value === "string"
}

export function isBoolean(value: unknown) {
  return value === !!value
}

export function isFunction(value: unknown) {
  return typeof value === "function"
}

export function isObject(value: unknown) {
  return (value !== null) && (typeof value === "object")
}

export const isArray: (value: unknown) => value is Array<unknown> = Array.isArray

export function isIterable(value: unknown): value is Iterable<unknown> {
  return isDefined(value) && isFunction(value[Symbol.iterator])
}

export function isSymbol(value: unknown) {
  return typeof value === "symbol"
}

export function isBigInt(value: unknown) {
  return typeof value === "bigint"
}

export function isError(value: unknown) {
  return value instanceof Error
}

export function isInt(value: unknown): value is number {
  return isNumber(value) && ((value % 1) === 0)
}

export function isFloat(value: unknown): value is number {
  return isNumber(value) && ((value % 1) !== 0)
}

export function isUInt(value: number): value is number {
  return isInt(value) && (value >= 0)
}

export function isUnsigned(value: unknown): value is number {
  return isNumber(value) && (value >= 0)
}

export function isPositive(value: unknown): value is number {
  return isNumber(value) && (value > 0)
}

export function isNegative(value: unknown): value is number {
  return isNumber(value) && (value < 0)
}

export function isSafeInt(value: unknown): value is number {
  return isNumber(value) && Number.isSafeInteger(value)
}

export function isFiniteNumber(value: unknown): value is number {
  return ((typeof value) === "number") && isFinite(value)
}

export function isInfinity(value: unknown) {
  return ((value === Infinity) || (value === -Infinity))
}

export function isNotANumber(value: unknown) {
  return (value !== value)
}

export function isZeroValue(value: unknown): value is (0 | null | undefined | void[]) {
  return (
    isEmpty(value)
    || (value === 0)
    || ((isArray(value) && (value.length === 0)))
    || (Object.keys(value).length === 0)
  )
}

export function isNonZeroValue(value: unknown) {
  return !isZeroValue(value)
}
