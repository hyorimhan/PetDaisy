import { PetDetails, PetUpdateType } from "@/types/petProfile";

export async function uploadPetImages(formData: FormData) {
  const response = await fetch("/api/pet-profile/image", {
    method: "POST",
    body: formData,
  });

  return response;
}

export async function registPetProfile(petData: PetDetails) {
  const response = await fetch("/api/pet-profile", {
    method: "POST",
    body: JSON.stringify(petData),
  });
  return response.json();
}

export async function updatePetProfile(petData: PetUpdateType, petId: string) {
  const response = await fetch(`/api/pet-profile/${petId}`, {
    method: "PATCH",
    body: JSON.stringify(petData),
  });
  return response.json();
}

export async function getPetProfile(petId: string) {
  const response = await fetch(`/api/pet-profile/${petId}`);
  const data = await response.json();
  return data.data;
}

export async function deletePetProfile(petId: string) {
  const response = await fetch(`/api/pet-profile/${petId}`, {
    method: "DELETE",
  });
  return response.json();
}
