"use client";
import { handleImageCompression } from "@/utils/image/compression";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface UploadImagesProps {
  type: "pet-profiles" | "symptoms";
  uploadFn: (formData: FormData) => Promise<Response>;
  initialPath?: string[];
}
export default function useUploadImages({
  type,
  uploadFn,
  initialPath = [],
}: UploadImagesProps) {
  const [uploadImageURLs, setUploadImageURLs] = useState<string[]>([]);
  const [imagePaths, setImagePaths] = useState<string[]>(initialPath);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  const { mutate: uploadNewImageFile } = useMutation({
    mutationFn: async (newImageFile: File) => {
      const formData = new FormData();
      formData.append("file", newImageFile);

      const response = await uploadFn(formData);
      const data = await response.json();

      const newImageURL = `https://ldkycewtchhtokppnajz.supabase.co/storage/v1/object/public/${type}/${data.imageURL}`;

      setUploadImageURLs((prev) => [...prev, newImageURL]);

      return newImageURL;
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    setUploadImageURLs([]);

    if (!files || files.length > 3) {
      setImageUploadError("이미지는 최대 3개까지 업로드 가능합니다.");
      setImagePaths([]);
      return;
    }

    const imageFiles = Array.from(files);

    try {
      const { comprssedImagesURLs } = await handleImageCompression(imageFiles);
      imageFiles.forEach((image) => uploadNewImageFile(image));

      setImagePaths(comprssedImagesURLs);
      setImageUploadError(null);
    } catch (error) {
      setImageUploadError("이미지 압축 중 오류가 발생했습니다.");
      setImagePaths([]);
    }
  };

  return {
    uploadImageURLs,
    imagePaths,
    imageUploadError,
    handleImageUpload,
  };
}
