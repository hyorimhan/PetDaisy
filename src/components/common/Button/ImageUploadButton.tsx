import Image from "next/image";

interface ImageUploadButtonProps {
  content: string;
  error?: string | null;
  imagePaths?: string[];
  handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage: (path: string) => void;
}

function ImageUploadButton({
  content,
  error,
  imagePaths = [],
  handleImageUpload,
  handleDeleteImage,
}: ImageUploadButtonProps) {
  return (
    <>
      <div>
        <label
          htmlFor="image-file"
          className="w-full py-[10px] text-[14px] rounded-lg flex items-center justify-center border border-main-3 bg-white gap-[7px] text-main-3 cursor-pointer"
        >
          <Image
            src="/img/icon/add.svg"
            alt="플러스 아이콘"
            width={20}
            height={20}
          />
          {content}
        </label>
        <input
          type="file"
          className="hidden"
          accept="image/jpg, image/png, image/webp, image/jpeg"
          id="image-file"
          multiple
          onChange={handleImageUpload}
        />
      </div>
      <p className="text-[12px] text-gray-3">
        이미지는 jpeg/jpg/png/webp 확장자만 업로드 가능합니다.
        <br /> 이미지는 한번에 3개까지만 업로드 가능합니다.
      </p>
      {error && <p className="text-[12px] text-red-5">{error}</p>}
      {imagePaths && (
        <ul className="w-full grid grid-cols-3 gap-2">
          {imagePaths.map((path) => (
            <li
              key={path.split("/").pop()}
              className="relative flex justify-center items-center w-full h-[110px] md:h-[200px]"
            >
              <Image
                src={path}
                fill
                alt="이미지"
                className="aspect-auto rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(path)}
                className="absolute -right-1 -top-2 bg-gray-4 text-[10px] rounded-full w-[16px] h-[16px] text-gray-1 shadow-shadow-1 hover:bg-red-4 hover:text-red-1"
              >
                -
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ImageUploadButton;
