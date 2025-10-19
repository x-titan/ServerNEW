import { isString } from "./types"

export function ensureNumber(value: string | undefined, defaultValue: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : defaultValue;
}

export function ensureBoolean(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined) return defaultValue;
  return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
}

export function ensureString(value: string | undefined, defaultValue: string): string {
  if (!isString(value))
    return defaultValue

  const trimmed = value.trim()
  if (trimmed === "")
    return defaultValue

  return trimmed;
}
