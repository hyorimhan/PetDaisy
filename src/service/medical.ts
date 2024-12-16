import { MedicalFormValues } from "@/types/medical";

export async function getMedicalVisitLists(
  petId: string,
  page?: number,
  limit?: number
) {
  const url =
    page && limit
      ? `/api/medical/visits/${petId}?page=${page}&limit=${limit}`
      : `/api/medical/visits/${petId}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
}

export async function getMedicalVisitById(petId: string) {
  const response = await fetch(`/api/medical/visits/${petId}`);
  const result = await response.json();
  return result.data;
}

export async function getMedicalVisitsByMonth(
  petId: string,
  year: number | null,
  month: number | null
) {
  const url = `/api/medical/visits/${petId}?year=${year}&month=${month}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
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

export async function addMedicalVisit(data: MedicalFormValues, petId: string) {
  const response = await fetch(`/api/medical/visits/${petId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

export async function deleteMedicalVisit(visitId: string) {
  const response = await fetch(`/api/medical/visits`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ visitId }),
  });
  const result = await response.json();
  return result.message;
}

export async function updateMedicalVisit(
  data: MedicalFormValues,
  petId: string
) {
  const response = await fetch(`/api/medical/visits/${petId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}
