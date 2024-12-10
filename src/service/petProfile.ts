import { PetProfile } from "@/types/petProfile";

export async function uploadPetImages(formData: FormData) {
  const response = await fetch("/api/pet-profile/image", {
    method: "POST",
    body: formData,
  });
  return response.json();
}

export async function registPetProfile(petData: PetProfile) {
  const response = await fetch("/api/pet-profile", {
    method: "POST",
    body: JSON.stringify(petData),
  });
  return response.json();
}
