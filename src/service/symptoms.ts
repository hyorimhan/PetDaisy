export const symptomsUpload = async (formData: FormData) => {
  const response = await fetch(`/api/symptoms/${formData.get("pet_id")}`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const getSymptomsList = async (pet_id: string) => {
  const response = await fetch(`/api/symptoms/${pet_id}`);
  const result = await response.json();
  return result.data;
};

export const getSymptomsDetail = async (pet_id: string, post_id: string) => {
  const response = await fetch(`/api/symptoms/${pet_id}/${post_id}`);
  const result = await response.json();
  return result.data;
};
