export const getWeightList = async (
  pet_id: string,
  page?: number,
  limit?: number
) => {
  const baseUrl = `/api/weight/${pet_id}`;
  const url =
    page && limit ? `${baseUrl}?page=${page}&limit=${limit}` : baseUrl;
  const response = await fetch(url);
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

export const deleteWeight = async (post_id: string, pet_id: string) => {
  const response = await fetch(`/api/weight/${pet_id}/${post_id}`, {
    method: "DELETE",
  });
  return response.json();
};
