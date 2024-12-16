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

export const getSymptomsList = async (
  pet_id: string,
  page?: number,
  limit?: number
) => {
  const baseUrl = `/api/symptoms/${pet_id}`;
  const url =
    page && limit ? `${baseUrl}?page=${page}&limit=${limit}` : baseUrl;
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
};

export const getSymptomsDetail = async (pet_id: string, post_id: string) => {
  const response = await fetch(`/api/symptoms/${pet_id}/${post_id}`);
  const result = await response.json();
  return result.data;
};

export const deleteSymptoms = async (pet_id: string, post_id: string) => {
  const response = await fetch(`/api/symptoms/${pet_id}/${post_id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const editSymptoms = async (data: formDataType) => {
  const response = await fetch(`/api/symptoms/${data.pet_id}/${data.post_id}`, {
    method: "PATCH",
    headers: {
      ContentType: "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
