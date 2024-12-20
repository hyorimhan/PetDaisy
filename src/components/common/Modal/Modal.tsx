import useModalStore from "@/zustand/useModalStore";
import Image from "next/image";
import Button from "../Button/Button";

function Modal() {
  const {
    isOpen,
    closeModal,
    modalType,
    modalTitle,
    modalContent,
    isTwoButton,
    onConfirm,
    onCancel,
  } = useModalStore((state) => state);

  if (!isOpen) return null;

  const IconByType = {
    error: "/img/icon/error.svg",
    success: "/img/icon/success.svg",
    warning: "/img/icon/warning.svg",
  };

  return (
    <div
      className="z-50 fixed bg-black/50 left-0 top-0 right-0 bottom-0 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[300px] ${
          modalTitle && "p-[20px]"
        } bg-white rounded-lg flex flex-col items-center`}
      >
        <div
          className={`flex flex-col items-center ${modalTitle && "gap-[10px]"}`}
        >
          {modalType && (
            <Image
              src={IconByType[modalType]}
              width={80}
              height={80}
              alt="icon"
            />
          )}
          <h3
            className={`text-[24px] ${
              modalType === "success"
                ? "text-green-4"
                : modalType === "error"
                ? "text-red-5"
                : "text-yellow-5"
            }`}
          >
            {modalTitle}
          </h3>
          <p className="text-base text-gray-4">{modalContent}</p>
        </div>
        {isTwoButton ? (
          <div className="w-full flex gap-2 justify-center mt-3">
            <Button
              content="취소"
              types="lg"
              bgColor="bg-gray-1"
              textColor="text-gray-3"
              onClick={onCancel}
            />
            <Button
              content="확인"
              types="lg"
              bgColor="bg-main-5"
              textColor="text-white"
              onClick={onConfirm}
            />
          </div>
        ) : (
          <div className={`w-full ${modalTitle && "mt-3"}`}>
            {onConfirm && (
              <Button
                content="확인"
                types="lg"
                bgColor="bg-main-5"
                textColor="text-white"
                onClick={onConfirm}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
