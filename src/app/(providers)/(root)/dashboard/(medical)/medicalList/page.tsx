import Button from "@/components/common/Button/Button";
import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import MedicalList from "@/components/features/dashboard/medical/list/MedicalList";

const MedicalListPage = () => {
  return (
    <Page>
      <PageTitle title="진료 기록" />
      <div className="mb-3">
        <Button
          href="/dashboard/medicalWrite"
          types="addInfo"
          content="진료 기록 등록"
        />
      </div>
      <MedicalList />
    </Page>
  );
};

export default MedicalListPage;
