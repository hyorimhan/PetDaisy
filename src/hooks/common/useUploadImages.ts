"use client";
import { handleImageCompression } from "@/utils/image/compression";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (initialPath.length > 0) {
      setImagePaths(initialPath);
      setUploadImageURLs(initialPath);
    }
    if (initialPath.length === 0) {
      setImagePaths([]);
      setUploadImageURLs([]);
    }
  }, [JSON.stringify(initialPath)]);

  const { mutate: uploadNewImageFile } = useMutation({
    mutationFn: async (newImageFile: File) => {
      const formData = new FormData();
      formData.append("file", newImageFile);

      const response = await uploadFn(formData);
      const data = await response.json();

      const newImageURL = `https://ldkycewtchhtokppnajz.supabase.co/storage/v1/object/public/${type}/${data.imageURL}`;

      return newImageURL;
    },
    onSuccess: (data) => {
      setUploadImageURLs((prev) => [...prev, data]);
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (!files) return;

    const newFiles = Array.from(files);

    const currentUploadCount = imagePaths.length; // imagePaths와 sync
    if (currentUploadCount + newFiles.length > 3) {
      setImageUploadError("이미지는 최대 3개까지 업로드 가능합니다.");
      return;
    }

    try {
      const { comprssedImagesURLs } = await handleImageCompression(newFiles);
      setImagePaths((prev) => [...prev, ...comprssedImagesURLs]);

      for (const file of newFiles) {
        await uploadNewImageFile(file);
      }

      setImageUploadError(null);
    } catch (error) {
      console.error(error);
      setImageUploadError("이미지 압축 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteImage = (path: string) => {
    setImagePaths((prev) => prev.filter((p) => p !== path));
    setUploadImageURLs((prev) => prev.filter((p) => p !== path));
  };

  return {
    uploadImageURLs,
    imagePaths,
    imageUploadError,
    handleImageUpload,
    handleDeleteImage,
  };
}
