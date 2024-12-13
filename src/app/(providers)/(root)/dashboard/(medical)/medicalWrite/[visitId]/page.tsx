import Page from "@/components/common/Page/Page";
import EditForm from "@/components/features/dashboard/medical/write/EditForm";

async function MedicalEditpage({ params }: { params: { visitId: string } }) {
  const { visitId } = await params;
  return (
    <Page>
      <EditForm visitId={visitId} />
    </Page>
  );
}

export default MedicalEditpage;
