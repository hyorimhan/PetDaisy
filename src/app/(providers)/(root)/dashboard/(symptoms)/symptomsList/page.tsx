import Button from "@/components/common/Button/Button";
import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import SymptomsList from "@/components/features/dashboard/symptoms/SymptomsList";

const SymptomListPage = () => {
  return (
    <Page>
      <PageTitle title="관찰 기록" />
      <Button
        content="관찰 기록 등록"
        types="addInfo"
        href={"/dashboard/symptomsWrite"}
      />
      <SymptomsList />
    </Page>
  );
};

export default SymptomListPage;
