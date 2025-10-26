import assert from "assert"
import { isString } from "./types"

export default function escapeHtml(str: string) {
  assert(isString(str), "str must be a string")
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
