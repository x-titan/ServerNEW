import assert from "assert"
import { isNumber } from "./types"

export function clamp(min: number, value: number, max: number) {
  assert(isNumber(min), "Min value must be a number")
  assert(isNumber(value), "'value' must be a number")
  assert(isNumber(max), "Max value must be a number")

  if (value < min) return min
  if (value > max) return max
  return value
}

/**
 * Если [min > max], то max игнорируется и minmax(min, max) обрабатывается как [min].
 * В ином случае если результат [min < max] то вернет [max].
 * 
 * @example
 * const value = 12
 * 
 * minmax(0, value)  // -> 12 (min < value)
 * minmax(10, value) // -> 12 (min < value)
 * minmax(20, value) // -> 20 (min > value)
 * 
 * minmax(value, 0)  // -> 0  (value > max)
 * minmax(value, 10) // -> 10 (value > max)
 * minmax(value, 20) // -> 12 (value < max)
 * 
 * @example
 * const value = 3
 * 
 * // при таком ввиде записи вункция всегда вернеть минимальное значение
 * minmax(value, 1) // -> 1
 * minmax(value, 2) // -> 2
 * minmax(value, 3) // -> 3
 * minmax(value, 4) // -> 3
 * minmax(value, 5) // -> 3
 * 
 * // при таком ввиде записи вункция всегда вернеть максимальное значение
 * minmax(1, value) // -> 3
 * minmax(2, value) // -> 3
 * minmax(3, value) // -> 3
 * minmax(4, value) // -> 4
 * minmax(5, value) // -> 5
 * 
 * 
 */
export default function minmax(min: number, max: number): number {
  assert(isNumber(min), "Min value must be a number")
  assert(isNumber(max), "Max value must be a number")

  return (min > max) ? min : max
}
