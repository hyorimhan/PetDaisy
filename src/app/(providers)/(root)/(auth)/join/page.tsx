import Logo from "@/components/common/Logo/Logo";
import AuthPage from "@/components/common/Page/AuthPage";
import JoinForm from "@/components/features/auth/join/JoinForm";

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
