export function with_<T, U>(obj: T, overrides: U): T & U {
  return { ...obj, ...overrides };
}
