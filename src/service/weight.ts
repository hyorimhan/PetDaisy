export const getWeightList = async (
  pet_id: string,
  page?: number,
  limit?: number
) => {
  const response = await fetch(
    `/api/weight/${pet_id}?page=${page}&limit=${limit}`
  );
  const result = await response.json();
  return result.data;
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
  const response = await fetch(`/api/weight/${pet_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, weight }),
  });
  return response.json();
};
