export const isNotNumber = (value: string | number): boolean =>
  isNaN(Number(value));
