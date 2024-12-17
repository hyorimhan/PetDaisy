import Logo from "@/components/common/Logo/Logo";
import AuthPage from "@/components/common/Page/AuthPage";
import LoginForm from "@/components/features/auth/login/LoginForm";

const LoginPage = () => {
  return (
    <AuthPage>
      <div className="flex flex-col items-center pt-[9.375rem]">
        <Logo size="md" />
        <LoginForm />
      </div>
    </AuthPage>
  );
};

export default LoginPage;
