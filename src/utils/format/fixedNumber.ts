import { ChangeEvent } from "react";

export const handleFixedNumber = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const formattedValue = parseFloat(value).toFixed(1); // 소수점 1자리로 제한
  return Number(formattedValue);
};
