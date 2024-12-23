import imageCompression from "browser-image-compression";

export async function handleImageCompression(imageFiles: File[]) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp", // WebP 형식으로 변환
    initialQuality: 0.8, // 초기 품질 설정
  };

  try {
    const comprssedImages = await Promise.all(
      imageFiles.map((image) => imageCompression(image, options))
    );
    const comprssedImagesURLs = comprssedImages.map((image) =>
      URL.createObjectURL(image)
    );

    return { comprssedImagesURLs, error: null };
  } catch (error) {
    console.error(error);
    return {
      comprssedImagesURLs: [],
      error: "이미지 압축에 실패했습니다.",
    };
  }
}
