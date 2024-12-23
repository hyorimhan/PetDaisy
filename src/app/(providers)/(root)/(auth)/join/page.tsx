import Logo from "@/components/common/Logo/Logo";
import AuthPage from "@/components/common/Page/AuthPage";
import JoinForm from "@/components/features/auth/join/JoinForm";

const JoinPage = () => {
  return (
    <AuthPage>
      <div className="w-full flex flex-col items-center justify-center">
        <Logo size="md" />
        <JoinForm />
      </div>
    </AuthPage>
  );
};

export default JoinPage;
