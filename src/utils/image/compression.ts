import imageCompression from 'browser-image-compression';
export async function handleImageCompression(imageFiles: File[]) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 300,
    useWebWorker: true,
  };

  const comprssedImages = await Promise.all(
    imageFiles.map((image) => imageCompression(image, options))
  );
  const comprssedImagesURLs = comprssedImages.map((image) =>
    URL.createObjectURL(image)
  );

  return { comprssedImagesURLs };
}
