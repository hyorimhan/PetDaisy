export async function getPetList(userId: string) {
  const response = await fetch(`/api/pet-list/${userId}`);
  const data = await response.json();
  return data.data;
}
