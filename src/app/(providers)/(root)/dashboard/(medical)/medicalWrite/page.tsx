import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import DetailFormField from "@/components/features/dashboard/medical/write/DetailFormField";
import ExpenseFormField from "@/components/features/dashboard/medical/write/ExpenseFormField";

const MedicalWritePage = () => {
  return (
    <Page>
      <PageTitle title="진료 기록" />
      <DetailFormField />
      <PageTitle title="병원비 내역" />
      <ExpenseFormField />
    </Page>
  );
};

export default MedicalWritePage;
