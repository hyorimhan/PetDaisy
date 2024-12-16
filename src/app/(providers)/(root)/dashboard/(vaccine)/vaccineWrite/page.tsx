import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import WriteForm from "@/components/features/dashboard/vaccine/write/WriteForm";

const VaccineWritePage = () => {
  return (
    <Page>
      <PageTitle title="예방 접종 기록" />
      <WriteForm />
    </Page>
  );
};

export default VaccineWritePage;
