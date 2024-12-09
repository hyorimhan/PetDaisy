import { PetProfile } from "@/types/petProfile";

export async function uploadPetImages(formData: FormData) {
  const data = fetch("/api/pet-profile/image", {
    method: "POST",
    body: formData,
  });
  return data;
}

export async function registPetProfile(petData: PetProfile) {
  const data = fetch("/api/pet-profile", {
    method: "POST",
    body: JSON.stringify(petData),
  });
  return data;
}
