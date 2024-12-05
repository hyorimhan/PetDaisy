import useMdoalStore from "@/zustand/modalStore";
import Image from "next/image";
import Button from "../Button/Button";

function Modal() {
  const {
    closeModal,
    modalType,
    modalTitle,
    modalContent,
    isTwoButton,
    onConfirm,
    onCancel,
  } = useMdoalStore((state) => state);

  const IconByType = {
    success: "/img/icon/success.svg",
    error: "/img/icon/error.svg",
    warning: "/img/icon/warning.svg",
  };

  return (
    <div
      className="fixed bg-black/40 left-0 top-0 right-0 bottom-0 flex justify-center items-center"
      onClick={closeModal}
    >
      <div className="w-[280px] py-[30px] px-[20px] bg-white rounded-lg flex flex-col items-center gap-[15px]">
        <div className="flex flex-col items-center gap-[10px]">
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
          <div className="w-full flex gap-2 justify-center">
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
          <Button
            content="확인"
            types="lg"
            bgColor="bg-gray-4"
            textColor="text-white"
            onClick={onConfirm}
          />
        )}
      </div>
    </div>
  );
}

export default Modal;
