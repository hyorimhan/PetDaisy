export async function getMedicalVisitLists(petId: string) {
  const response = await fetch(`/api/medical/visits/${petId}`);
  const data = await response.json();
  return data.data;
}

export async function getMedicalExpensesByPetId(visitId: string) {
  const response = await fetch(`/api/medical/expenses/${visitId}`);
  const data = await response.json();
  return data.data;
}

export async function getMedicalDetails(visitId: string) {
  const response = await fetch(`/api/medical/details/${visitId}`);
  const data = await response.json();
  return data.data;
}
