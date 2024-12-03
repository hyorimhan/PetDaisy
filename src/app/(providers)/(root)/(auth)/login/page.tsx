import Logo from '@/components/common/Logo/Logo';
import Page from '@/components/common/Page/Page';
import LoginForm from '@/components/features/auth/login/LoginForm';

const LoginPage = () => {
  return (
    <Page>
      <div className="flex flex-col items-center pt-[9.375rem]">
        <Logo size="md" />
        <LoginForm />
      </div>
    </Page>
  );
};

export default LoginPage;
