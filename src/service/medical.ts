export async function getMedicalVisitLists(petId: string) {
  const response = await fetch(`/api/medical/visits/${petId}`);
  const data = await response.json();
  return data;
}
