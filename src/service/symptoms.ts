import { formDataType } from "@/components/features/dashboard/symptoms/SymptomsWrite";

export const symptomsUpload = async (formData: FormData) => {
  const response = await fetch(`/api/symptoms/image`, {
    method: "POST",
    body: formData,
  });
  return response;
};

export const symptomsRegist = async (data: formDataType) => {
  const response = await fetch(`/api/symptoms/${data.pet_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
