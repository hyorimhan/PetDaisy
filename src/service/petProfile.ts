export async function uploadPetImages(formData: FormData) {
  const data = fetch("/api/petProfile", {
    method: "POST",
    body: formData,
  });
  return data;
}
