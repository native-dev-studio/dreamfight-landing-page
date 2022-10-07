export function clamp(
  val: number,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY
) {
  return Math.max(min, Math.min(max, val));
}
