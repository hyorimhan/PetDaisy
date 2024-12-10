import Image from "next/image";

interface ImageUploadButtonProps {
  content: string;
  error?: string | null;
  imagePaths?: string[];
  handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImageUploadButton({
  content,
  error,
  imagePaths = [],
  handleImageUpload,
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
          accept="image/*"
          id="image-file"
          multiple
          onChange={handleImageUpload}
        />
      </div>
      {error && <p className="text-[12px] text-red-5">{error}</p>}
      {imagePaths && (
        <ul className="w-full grid grid-cols-3 gap-2">
          {imagePaths.map((path) => (
            <li
              key={path}
              className="relative flex justify-center items-center bg-white w-full h-[110px] md:h-[200px]"
            >
              <Image
                src={path}
                fill
                alt="이미지"
                className="aspect-auto rounded-lg object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ImageUploadButton;
