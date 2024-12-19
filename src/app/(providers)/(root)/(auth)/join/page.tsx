<<<<<<< HEAD
import Logo from '@/components/common/Logo/Logo';
import Page from '@/components/common/Page/Page';
import JoinForm from '@/components/features/auth/join/Join';
=======
import Logo from "@/components/common/Logo/Logo";
import AuthPage from "@/components/common/Page/AuthPage";
import JoinForm from "@/components/features/auth/join/JoinForm";
>>>>>>> 8a9a6a5afccf2c0a085e3f388527917fce6d96da

const JoinPage = () => {
  return (
    <AuthPage>
      <div className="flex flex-col items-center justify-center pt-[180px] ">
        <Logo size="md" />
        <JoinForm />
      </div>
    </AuthPage>
  );
};

export default JoinPage;
