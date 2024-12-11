export function calculateTotal(items: number[]) {
  const total = items.reduce((acc, item) => acc + item, 0);
  if (total > 999999999) {
    return 999999999;
  }
  return total;
}
