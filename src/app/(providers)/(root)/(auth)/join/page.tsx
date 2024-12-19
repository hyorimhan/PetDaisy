import Logo from '@/components/common/Logo/Logo';
import Page from '@/components/common/Page/Page';
import JoinForm from '@/components/features/auth/join/Join';

const JoinPage = () => {
  return (
    <Page>
      <div className="flex flex-col items-center justify-center pt-[180px] ">
        <Logo size="md" />
        <JoinForm />
      </div>
    </Page>
  );
};

export default JoinPage;
