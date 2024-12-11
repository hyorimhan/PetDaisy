export function calculateTotal(items: number[]) {
  return items.reduce((acc, item) => acc + item, 0).toLocaleString();
}
