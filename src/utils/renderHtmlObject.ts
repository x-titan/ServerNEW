import escapeHtml from "./escapeHtml"
import {
  isString,
  isObject,
  isNumber,
  isBoolean,
  isArray,
} from "./types"

export default function renderHtmlObject(obj: any, pretty = true): string {
  const indent = (level: number) => "&nbsp;".repeat(level * 2)

  const render = (value: any, level = 0): string => {
    if (isString(value)) return `"${escapeHtml(value)}"`
    if (isNumber(value) || isBoolean(value)) return String(value)
    if (isArray(value)) {
      const items = value.map(v => render(v, level + 1)).join(pretty ? ",<br>" : ", ")
      return `[${pretty ? "<br>" + indent(level + 1) + items + "<br>" + indent(level) : items}]`
    }
    if (isObject(value)) {
      const entries = Object.entries(value)
        .map(([k, v]) => `${indent(level + 1)}<b>${escapeHtml(k)}</b>: ${render(v, level + 1)}`)
        .join(pretty ? ",<br>" : ", ")
      return `{${pretty ? "<br>" + entries + "<br>" + indent(level) : entries}}`
    }
    return String(value)
  }

  return `<pre style="font-family: monospace;">${render(obj)}</pre>`
}
