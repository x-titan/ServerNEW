export function num(value: string | undefined, defaultValue: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : defaultValue;
}

export function bool(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined) return defaultValue;
  return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
}

export function str(value: string | undefined, defaultValue: string): string {
  return value?.trim() || defaultValue;
}
