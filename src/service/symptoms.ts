export const symptomsUpload = async (formData: FormData) => {
  const response = await fetch(`/api/symptoms/${formData.pet_id}`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};
