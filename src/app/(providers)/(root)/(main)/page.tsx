"use client";
import Button from "@/components/common/Button/Button";
import Logo from "@/components/common/Logo/Logo";
import AuthPage from "@/components/common/Page/AuthPage";
import AppDescription from "@/components/features/main/AppDescription";
import { signInWithGoogle, signInWithKakao } from "@/service/auth";

const MainPage = () => {
  return (
    <AuthPage>
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
            onClick={signInWithGoogle}
          />
        </div>
      </div>
    </AuthPage>
  );
};

export default MainPage;
