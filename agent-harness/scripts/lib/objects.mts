// A copy of `object` without `key`: what `const { key, ...rest } = object` gives, without an unused
// binding.
export function omit<T extends object, K extends PropertyKey>(
  object: T,
  key: K
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(object).filter(([name]) => name !== key)
  ) as Omit<T, K>;
}
