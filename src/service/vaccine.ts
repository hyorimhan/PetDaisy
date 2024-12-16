import { VaccineFormData } from "@/types/vaccine";

export async function getVaccinationById(petId: string) {
  const response = await fetch(`/api/vaccine/${petId}`);
  const data = await response.json();
  return data.data;
}

export async function addVaccination(data: VaccineFormData, petId: string) {
  const response = await fetch(`/api/vaccine/${petId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
