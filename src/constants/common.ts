export const BIG_NUMBER = 999999999;

export const YEARS = [...Array(2024 - 1999 + 1)].map((_, i) => ({
  key: 2024 - i,
  value: 2024 - i,
}));

export const MONTH = [...Array(12)].map((_, i) => ({
  key: i + 1,
  value: i + 1,
}));
