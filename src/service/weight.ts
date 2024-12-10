export const getWeightList = async (pet_id: string) => {
  const response = await fetch(`/api/weight/${pet_id}`);
  return response.json();
};

export const registerWeight = async ({
  date,
  weight,
  pet_id,
}: {
  date: string;
  weight: number;
  pet_id: string;
}) => {
  const response = await fetch(`/api/weight/${pet_id}}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, weight, pet_id }),
  });
  return response.json();
};
