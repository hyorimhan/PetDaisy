export const symptomsImageUpload = async (formData: FormData) => {
  const response = await fetch(`/api/symptoms`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};
