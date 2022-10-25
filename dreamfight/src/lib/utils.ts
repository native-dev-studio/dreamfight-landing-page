export function clamp(
  val: number,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY
) {
  return Math.max(min, Math.min(max, val));
}

export function log(label: string): (value: any) => void {
  return (value) => console.log(`${label}:`, value);
}
