export const getWeightList = async (
  petId: string,
  page?: number,
  limit?: number
) => {
  const baseUrl = `/api/weight/${petId}`;
  const url =
    page && limit ? `${baseUrl}?page=${page}&limit=${limit}` : baseUrl;
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
};

export const registerWeight = async ({
  date,
  weight,
  petId,
}: {
  date: string;
  weight: string;
  petId: string;
}) => {
  const response = await fetch(`/api/weight/${petId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, weight }),
  });
  return response.json();
};

export const deleteWeight = async (postId: string, petId: string) => {
  const response = await fetch(`/api/weight/${petId}/${postId}`, {
    method: "DELETE",
  });
  return response.json();
};
