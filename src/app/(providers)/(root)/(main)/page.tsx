"use client";
import Button from "@/components/common/Button/Button";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";
import Logo from "@/components/common/Logo/Logo";
import Page from "@/components/common/Page/Page";
import AppDescription from "@/components/features/main/AppDescription";
import useUploadImages from "@/hooks/useUploadImages";
import { signInWithKakao } from "@/service/auth";
import { uploadPetImages } from "@/service/petProfile";
import useModalStore from "@/zustand/modalStore";

const MainPage = () => {
  const openModal = useModalStore((state) => state.openModal);
  const handleOpenModal = () => {
    openModal({
      type: "success",
      title: "로그인 성공",
      content: "로그인에 성공했습니다.",
      onConfirm: () => {
        alert("확인 버튼 클릭");
      },
    });
  };

  const handleOpenModalTwoButton = () => {
    openModal({
      type: "warning",
      title: "삭제하시겠습니까?",
      content: "해당 게시글을 삭제합니다",
      isTwoButton: true,
      onConfirm: () => {
        alert("확인 버튼 클릭");
      },
      onCancel: () => {
        alert("취소 버튼 클릭");
      },
    });
  };

  const { uploadImageURLs, imagePaths, imageUploadError, handleImageUpload } =
    useUploadImages({
      type: "pet-profiles",
      uploadFn: uploadPetImages,
    });

  return (
    <Page>
      <div className="py-[130px] flex flex-col items-center justify-center">
        <Logo size="lg" />
        <AppDescription />
        <div className="w-full flex flex-col justify-center gap-[10px]">
          <Button
            content="로그인"
            types="lg"
            textColor="text-white"
            bgColor="bg-main-4"
            href="/login"
          />
          <Button
            content="회원가입"
            types="lg"
            textColor="text-white"
            bgColor="bg-blue-4"
            href="/join"
          />
          <Button
            content="카카오 로그인하기"
            types="lg"
            textColor="text-gray-2"
            outlineColor="border-gray-2"
            onClick={signInWithKakao}
          />
          <Button
            content="구글 로그인하기"
            types="lg"
            textColor="text-gray-2"
            outlineColor="border-gray-2"
          />
        </div>
        <div className="mt-5 w-full flex flex-col gap-3">
          버튼 예시
          <Button
            content="type: lg"
            types="lg"
            textColor="text-white"
            bgColor="bg-main-4"
          />
          <Button
            content="type: lg 아웃라인"
            types="lg"
            textColor="text-gray-2"
            outlineColor="border-gray-2"
          />
          <Button
            content="type: md"
            types="md"
            textColor="text-white"
            bgColor="bg-main-4"
          />
          <Button
            content="type: md 아웃라인"
            types="md"
            textColor="text-gray-2"
            outlineColor="border-gray-2"
          />
          <Button
            content="type: sm"
            types="sm"
            textColor="text-white"
            bgColor="bg-main-4"
          />
          <Button
            content="type: sm 아웃라인"
            types="sm"
            textColor="text-gray-2"
            outlineColor="border-gray-2"
          />
          <Button content="정보 등록하기" types="addInfo" />
          <ImageUploadButton
            content="사진 선택"
            imagePaths={imagePaths}
            error={imageUploadError}
            handleImageUpload={handleImageUpload}
          />
        </div>
        <div className="mt-5 w-full flex flex-col gap-3">
          인풋 예시
          <Input label="아이디" type="text" />
          <Input label="아이디" type="text" invalid={true} />
          <Input label="아이디" type="text" invalid={true} unit="kg" />
          <Select
            label="중성화 여부"
            options={[
              { key: 1, value: "옵션1" },
              { key: 2, value: "옵션2" },
              { key: 3, value: "옵션3" },
            ]}
          />
        </div>
        <div className="mt-5 w-full">
          버튼 하나 짜리
          <Button
            content="모달"
            types="lg"
            textColor="text-white"
            bgColor="bg-main-4"
            onClick={handleOpenModal}
          />
        </div>
        <div className="mt-5 w-full">
          버튼 두개 짜리
          <Button
            content="모달"
            types="lg"
            textColor="text-white"
            bgColor="bg-main-4"
            onClick={handleOpenModalTwoButton}
          />
        </div>
      </div>
    </Page>
  );
};

export default MainPage;
