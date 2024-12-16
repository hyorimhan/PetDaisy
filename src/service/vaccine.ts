export async function getVaccinationById(petId: string) {
  const response = await fetch(`/api/vaccine/${petId}`);
  const data = await response.json();
  return data.data;
}
