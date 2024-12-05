import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import PetRegistrationForm from "@/components/features/dashboard/petRegistration/PetRegistrationForm";

const petRegistrationPage = () => {
  return (
    <Page>
      <PageTitle title="반려동물 등록" />
      <PetRegistrationForm />
    </Page>
  );
};

export default petRegistrationPage;
