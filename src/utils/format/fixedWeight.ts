import { ChangeEvent } from "react";

export const handleFixedWeight = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const value = e.target.value;
  if (+value < 0) return "0";
  return String(value);
};
