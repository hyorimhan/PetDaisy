export function calculateTotal(items: number[]) {
  const total = items.reduce((acc, item) => acc + item, 0);
  return total.toLocaleString();
}
