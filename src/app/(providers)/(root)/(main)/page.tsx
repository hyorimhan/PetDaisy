import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Logo from '@/components/common/Logo/Logo';
import Page from '@/components/common/Page/Page';
import AppDescription from '@/components/features/main/AppDescription';

const MainPage = () => {
  return (
    <Page>
      <div className="py-[130px] flex flex-col items-center justify-center">
        <Logo size="lg" />
        <AppDescription />
        <div className="w-full flex flex-col justify-center gap-[10px]">
          <Button
            content="로그인"
            type="lg"
            textColor="text-white"
            bgColor="bg-main-4"
          />
          <Button
            content="회원가입"
            type="lg"
            textColor="text-white"
            bgColor="bg-blue-4"
            href="/join"
          />
          <Button
            content="카카오 로그인하기"
            type="lg"
            textColor="text-gray-2"
            outlineColor="border-gray-2"
          />
          <Button
            content="구글 로그인하기"
            type="lg"
            textColor="text-gray-2"
            outlineColor="border-gray-2"
          />
        </div>
        <div className="mt-5 w-full flex flex-col gap-3">
          버튼 예시
          <Button
            content="type: lg"
            type="lg"
            textColor="text-white"
            bgColor="bg-main-4"
          />
          <Button
            content="type: lg 아웃라인"
            type="lg"
            textColor="text-gray-2"
            outlineColor="border-gray-2"
          />
          <Button
            content="type: md"
            type="md"
            textColor="text-white"
            bgColor="bg-main-4"
          />
          <Button
            content="type: md 아웃라인"
            type="md"
            textColor="text-gray-2"
            outlineColor="border-gray-2"
          />
          <Button
            content="type: sm"
            type="sm"
            textColor="text-white"
            bgColor="bg-main-4"
          />
          <Button
            content="type: sm 아웃라인"
            type="sm"
            textColor="text-gray-2"
            outlineColor="border-gray-2"
          />
          <Button content="type: add" type="add" />
        </div>
        <div className="mt-5 w-full flex flex-col gap-3">
          인풋 예시
          <Input label="아이디" type="text" />
          <Input label="아이디" type="text" invalid={true} />
        </div>
      </div>
    </Page>
  );
};

export default MainPage;
