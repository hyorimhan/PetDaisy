import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import MedicalList from "@/components/features/dashboard/medical/MedicalList";

const MedicalListPage = () => {
  return (
    <Page>
      <PageTitle title="진료 기록" />
      <MedicalList />
    </Page>
  );
};

export default MedicalListPage;
