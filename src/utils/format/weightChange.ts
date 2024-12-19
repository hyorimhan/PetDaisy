export const formatWeightChange = (change: number) => {
  if (change === 0) return "변화없음";
  if (change > 0) return `+${change}kg`;
  return `${change}kg`;
};

export const weightChangeColor = (change: number) => {
  if (change === 0) return "text-gray-4";
  if (change > 0) return "text-red-4";
  return "text-blue-5";
};
