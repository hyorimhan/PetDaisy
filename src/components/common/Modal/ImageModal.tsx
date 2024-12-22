import useModalStore from "@/zustand/useModalStore";

function ImageModal() {
  const { isOpen, closeModal, modalContent } = useModalStore((state) => state);

  if (!isOpen) return null;

  return (
    <div
      className="z-50 fixed bg-black/50 left-0 top-0 right-0 bottom-0 flex justify-center items-center"
      onClick={closeModal}
    >
      <p className="text-base text-gray-4">{modalContent}</p>
    </div>
  );
}

export default ImageModal;
