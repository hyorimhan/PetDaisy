import { BIG_NUMBER } from "@/constants/common";

export function calculateTotal(items: number[]) {
  const total = items.reduce((acc, item) => acc + item, 0);
  if (total > BIG_NUMBER) {
    return BIG_NUMBER.toLocaleString();
  }
  return total.toLocaleString();
}
