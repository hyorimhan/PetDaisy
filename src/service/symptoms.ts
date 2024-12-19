import { FormDataType } from "@/components/features/dashboard/symptoms/SymptomsWrite";

export const symptomsUpload = async (formData: FormData) => {
  const response = await fetch(`/api/symptoms/image`, {
    method: "POST",
    body: formData,
  });

  return response;
};
export const symptomsRegist = async (data: FormDataType) => {
  const response = await fetch(`/api/symptoms/${data.petId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const getSymptomsList = async (
  petId: string,
  page?: number,
  limit?: number
) => {
  const baseUrl = `/api/symptoms/${petId}`;
  const url =
    page && limit ? `${baseUrl}?page=${page}&limit=${limit}` : baseUrl;
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
};

export const getSymptomsDetail = async (petId: string, postId: string) => {
  const response = await fetch(`/api/symptoms/${petId}/${postId}`);
  const result = await response.json();
  return result.data;
};

export const deleteSymptoms = async (petId: string, postId: string) => {
  const response = await fetch(`/api/symptoms/${petId}/${postId}`, {
    method: "DELETE",
  });
  return response.json();
};

export const editSymptoms = async (data: FormDataType) => {
  const response = await fetch(`/api/symptoms/${data.petId}/${data.postId}`, {
    method: "PATCH",
    headers: {
      ContentType: "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
