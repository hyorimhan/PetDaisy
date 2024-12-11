import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import Edit from "@/components/features/dashboard/medical/write/Edit";

async function MedicalEditpage({ params }: { params: { visitId: string } }) {
  const { visitId } = await params;
  return (
    <Page>
      <PageTitle title="진료 기록" />
      <Edit />
    </Page>
  );
}

export default MedicalEditpage;
