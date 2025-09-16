export function snakeToCamel<T>(input: any): T {
  if (Array.isArray(input)) return input.map(snakeToCamel) as unknown as T;
  if (input && typeof input === 'object') {
    return Object.keys(input).reduce((acc: any, key) => {
      const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      acc[camel] = snakeToCamel((input as any)[key]);
      return acc;
    }, {}) as T;
  }
  return input as T;
}
