import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import DetailAction from "@/components/features/dashboard/medical/detail/DetailAction";
import ExpenseList from "@/components/features/dashboard/medical/detail/ExpenseList";
import MedicalDetail from "@/components/features/dashboard/medical/detail/MedicalDetail";
import { ParamsType } from "@/types/common";

async function MedicalDetailPage({ params }: ParamsType) {
  const { visitId } = await params;
  return (
    <Page>
      <PageTitle title="진료 기록" />
      <MedicalDetail visitId={visitId ?? ""} />
      <PageTitle title="병원비 내역" />
      <ExpenseList visitId={visitId ?? ""} />
      <DetailAction visitId={visitId ?? ""} />
    </Page>
  );
}

export default MedicalDetailPage;
